// Test Chatbot dengan Groq API
const testQuestions = [
  "Halo, apa kabar?",
  "Bagaimana cara membuat KTP?",
  "Apa saja wisata yang ada di Tanjung Barat?",
  "Dimana lokasi kantor kelurahan?"
];

async function testChat() {
  console.log('🧪 Testing Chatbot...\n');

  for (const question of testQuestions) {
    console.log(`\n👤 User: ${question}`);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          conversationId: 'test-' + Date.now()
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log(`🤖 Bot: ${data.message}`);
        console.log(`   Provider: ${data.provider}`);
      } else {
        console.log(`   ❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    // Delay antar pertanyaan
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n✅ Test Selesai!');
}

testChat();
