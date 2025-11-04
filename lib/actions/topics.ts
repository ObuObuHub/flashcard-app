'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Tag } from '@/types'
import { validateTagName } from '@/lib/validation'

export async function getTags(): Promise<Tag[]> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  if (error) throw error

  return tags || []
}

export async function createTag(formData: FormData) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const name = formData.get('name') as string

  // Validate input
  const validatedName = validateTagName(name)

  // Check for duplicates
  const { data: existing } = await supabase
    .from('tags')
    .select('id')
    .eq('user_id', user.id)
    .eq('name', validatedName)
    .single()

  if (existing) {
    throw new Error('Un subiect cu acest nume există deja')
  }

  const { data: tag, error } = await supabase
    .from('tags')
    .insert({
      user_id: user.id,
      name: validatedName,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/topics')
  return tag
}

export async function updateTag(tagId: string, formData: FormData) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const name = formData.get('name') as string

  // Validate input
  const validatedName = validateTagName(name)

  // Verify ownership before update
  const { data: existingTag } = await supabase
    .from('tags')
    .select('id')
    .eq('id', tagId)
    .eq('user_id', user.id)
    .single()

  if (!existingTag) {
    throw new Error('Subiectul nu a fost găsit sau nu ai permisiunea de a-l modifica')
  }

  // Check for duplicate name (excluding current tag)
  const { data: duplicate } = await supabase
    .from('tags')
    .select('id')
    .eq('user_id', user.id)
    .eq('name', validatedName)
    .neq('id', tagId)
    .single()

  if (duplicate) {
    throw new Error('Un alt subiect cu acest nume există deja')
  }

  const { data: tag, error } = await supabase
    .from('tags')
    .update({ name: validatedName })
    .eq('id', tagId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error

  revalidatePath('/topics')
  return tag
}

export async function deleteTag(tagId: string) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  // Verify ownership before delete
  const { data: existingTag } = await supabase
    .from('tags')
    .select('id')
    .eq('id', tagId)
    .eq('user_id', user.id)
    .single()

  if (!existingTag) {
    throw new Error('Subiectul nu a fost găsit sau nu ai permisiunea de a-l șterge')
  }

  // Delete associated card_tags first (cascade should handle this, but being explicit)
  await supabase.from('card_tags').delete().eq('tag_id', tagId)

  const { error } = await supabase.from('tags').delete().eq('id', tagId).eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/topics')
  return { success: true }
}

// Get tags for a specific card
export async function getCardTags(cardId: string): Promise<Tag[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('card_tags')
    .select('tag_id, tags(*)')
    .eq('card_id', cardId)

  if (error) throw error

  return (data || []).map((ct: Record<string, unknown>) => ct.tags).filter(Boolean) as Tag[]
}

// Add a tag to a card
export async function addTagToCard(cardId: string, tagId: string) {
  const supabase = await createClient()

  // Check if relationship already exists
  const { data: existing } = await supabase
    .from('card_tags')
    .select('*')
    .eq('card_id', cardId)
    .eq('tag_id', tagId)
    .single()

  if (existing) {
    return { success: true } // Already tagged
  }

  const { error } = await supabase.from('card_tags').insert({
    card_id: cardId,
    tag_id: tagId,
  })

  if (error) throw error

  revalidatePath('/decks')
  return { success: true }
}

// Remove a tag from a card
export async function removeTagFromCard(cardId: string, tagId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('card_tags')
    .delete()
    .eq('card_id', cardId)
    .eq('tag_id', tagId)

  if (error) throw error

  revalidatePath('/decks')
  return { success: true }
}

// Set all tags for a card (replaces existing tags)
export async function setCardTags(cardId: string, tagIds: string[]) {
  const supabase = await createClient()

  // Remove all existing tags
  await supabase.from('card_tags').delete().eq('card_id', cardId)

  // Add new tags
  if (tagIds.length > 0) {
    const { error } = await supabase
      .from('card_tags')
      .insert(tagIds.map((tagId) => ({ card_id: cardId, tag_id: tagId })))

    if (error) throw error
  }

  revalidatePath('/decks')
  return { success: true }
}
