/**
 * Browser Console Script to Create Topics
 *
 * HOW TO USE:
 * 1. Open http://localhost:3000 in your browser
 * 2. Open Developer Console (F12 or Cmd+Option+J on Mac)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 *
 * This will create all your medical exam topics based on your folder structure.
 */

(async function createTopics() {
  console.log('🌱 Starting topic creation...');

  const topics = [
    // Biochemistry (Biochimie)
    'Biochimie Practic',
    'Biochimie Scris',

    // Hematology (Hemato)
    'Hemato Practic',
    'Hemato Scris',

    // Other subjects
    'Bacteriologie',
    'Virusologie',
    'Parazitologie',
    'Chimie Practic',
  ];

  let created = 0;
  let failed = 0;
  const errors = [];

  for (const topicName of topics) {
    try {
      console.log(`Creating: ${topicName}...`);

      const formData = new FormData();
      formData.append('name', topicName);

      // Call the server action via form submission
      const response = await fetch('/topics', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log(`✅ Created: ${topicName}`);
        created++;
      } else {
        const errorText = await response.text();
        if (errorText.includes('există deja')) {
          console.log(`ℹ️  Already exists: ${topicName}`);
        } else {
          console.error(`❌ Failed: ${topicName}`, errorText);
          failed++;
          errors.push({ topic: topicName, error: errorText });
        }
      }

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Error creating ${topicName}:`, error);
      failed++;
      errors.push({ topic: topicName, error: error.message });
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ❌ Failed: ${failed}`);

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(({ topic, error }) => {
      console.log(`   ${topic}: ${error}`);
    });
  }

  console.log('\n✨ Done! Refresh the page to see your topics.');
  console.log('   Visit http://localhost:3000/topics to manage them.');
})();
