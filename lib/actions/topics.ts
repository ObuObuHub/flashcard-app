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

  // Update tag - user_id constraint ensures ownership
  const { data: tag, error } = await supabase
    .from('tags')
    .update({ name: validatedName })
    .eq('id', tagId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned - tag not found or not owned
      throw new Error('Subiectul nu a fost găsit sau nu ai permisiunea de a-l modifica')
    }
    throw error
  }

  revalidatePath('/topics')
  return tag
}

export async function deleteTag(tagId: string) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  // Delete associated card_tags first (cascade should handle this, but being explicit)
  await supabase.from('card_tags').delete().eq('tag_id', tagId)

  // Delete tag - user_id constraint ensures ownership
  const { data, error } = await supabase
    .from('tags')
    .delete()
    .eq('id', tagId)
    .eq('user_id', user.id)
    .select('id')

  if (error) throw error

  // Check if any row was deleted
  if (!data || data.length === 0) {
    throw new Error('Subiectul nu a fost găsit sau nu ai permisiunea de a-l șterge')
  }

  revalidatePath('/topics')
  return { success: true }
}
