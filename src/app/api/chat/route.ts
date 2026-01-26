import { NextRequest, NextResponse } from 'next/server'
import { alamatKantor, wilayah, kantor, pelayanan, wisata, pelayananList, beritaTerbaru } from '@/lib/config'

// Dynamic system prompt that reads from config
const buildSystemPrompt = () => {
  const contactInfo = `
Key information about ${wilayah.nama}:
- Location: ${wilayah.lokasi}
- Office address: ${alamatKantor.alamat}
- Phone: ${alamatKantor.telepon}
- WhatsApp: ${alamatKantor.wa}
- Email: info@tanjungbarat.go.id
- Office hours: ${kantor.hariBuka}, ${kantor.buka} - ${kantor.tutup}
- Office closed: ${kantor.hariTutup}
- Area: ${wilayah.luas}
- Population: ${wilayah.penduduk}`.trim()

  const servicesInfo = `
Services available:
${pelayananList.map(p => '- ' + p).join('\n')}`.trim()

  const attractionsInfo = `
Tourist attractions:
${wisata.map(w => '- ' + w.nama + ': ' + w.deskripsi + ' ' + w.icon).join('\n')}`.trim()

  const newsInfo = `
Latest news:
${beritaTerbaru.map(b => '- ' + b.judul + ' (' + b.tanggal + '): ' + b.deskripsi + ' ' + b.icon).join('\n')}`.trim()

  const orgInfo = `
Organizational structure:
- Lurah: ${wilayah.nama} Lurah
- Sekretaris: ${wilayah.nama} Secretary
- Kepala Bidang Pemerintahan
- Kepala Bidang Kesehatan Sosial
- Kepala Bidang Pelayanan
- Kepala Bidang Kependudukan & Ketertiban
- Bendahara Kelurahan

Office location: ${alamatKantor.alamat}
Contact phone: ${alamatKantor.telepon}
Contact WhatsApp: ${alamatKantor.wa}`.trim()

  return `You are a helpful and friendly AI assistant for ${wilayah.nama}, ${wilayah.lokasi}. Your role is to provide accurate information about ${wilayah.nama} including:

1. Government services (administrative services like KTP, KK, birth certificates)
2. Tourist attractions and potential
3. Latest news and events in ${wilayah.nama}
4. Contact information and office hours
5. General information about area

${contactInfo}

${servicesInfo}

${attractionsInfo}

${newsInfo}

${orgInfo}

Guidelines:
- Always be polite, friendly, and helpful
- Use Indonesian language as default
- Be concise but provide complete information
- If you don't know something specific, guide users to contact the office directly
- Format information clearly with bullet points or numbered lists when appropriate
- Use appropriate emojis to make conversations more engaging (e.g., 🏛️ for buildings, 📞 for contact info, 🌳 for parks)`
}

// Simple in-memory conversation storage (in production, use Redis or database)
const conversations = new Map<string, Array<{ role: string; content: string }>>()

// Groq API Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationId, history = [] } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if API key is available
    if (!GROQ_API_KEY) {
      // Fall back to offline mode if API key not available
      return getFallbackResponse(message)
    }

    // Get or create conversation history
    let conversationHistory: Array<{ role: string; content: string }>

    if (conversationId && conversations.has(conversationId)) {
      conversationHistory = conversations.get(conversationId)!
    } else {
      conversationHistory = [
        {
          role: 'assistant',
          content: buildSystemPrompt(),
        }
      ]
    }

    // Add conversation history from request if provided
    if (history && Array.isArray(history) && history.length > 0) {
      conversationHistory = [
        {
          role: 'assistant',
          content: buildSystemPrompt(),
        },
        ...history
      ]
    }

    // Add new user message
    conversationHistory.push({
      role: 'user',
      content: message,
    })

    try {
      // Call Groq API
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.choices || !data.choices[0]) {
        throw new Error('Groq API error: ' + (data.error?.message || 'Invalid response'))
      }

      const assistantResponse = data.choices[0]?.message?.content

      if (!assistantResponse) {
        throw new Error('Empty response from Groq API')
      }

      // Add assistant response to history
      conversationHistory.push({
        role: 'assistant',
        content: assistantResponse,
      })

      // Store conversation history
      if (conversationId) {
        conversations.set(conversationId, conversationHistory)
      }

      // Keep only last 10 messages (excluding system prompt) to manage memory
      const maxHistorySize = 11 // 1 system + 10 conversation messages
      if (conversationHistory.length > maxHistorySize) {
        const trimmedHistory = [
          conversationHistory[0], // Keep system prompt
          ...conversationHistory.slice(-maxHistorySize + 1)
        ]
        if (conversationId) {
          conversations.set(conversationId, trimmedHistory)
        }
      }

      return NextResponse.json({
        success: true,
        message: assistantResponse,
        conversationId: conversationId || Date.now().toString(),
        provider: 'groq-online',
        config: {
          contact: alamatKantor,
          wilayah: wilayah,
        },
      })

    } catch (groqError) {
      console.error('Groq API Error:', groqError)
      
      // Fall back to offline mode if Groq API fails
      return getFallbackResponse(message)
    }

  } catch (error) {
    console.error('Chat API Error:', error)

    // Last resort - fallback response
    return getFallbackResponse(message)
  }
}

// Fallback offline response function that reads from config
function getFallbackResponse(message: string) {
  let botResponse = ''
  const lowerInput = message.toLowerCase()

  // Salutations
  if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hi')) {
    botResponse = `Halo! Selamat datang di ${wilayah.nama}. Ada yang bisa saya bantu? 😊`
  } 
  
  // KTP inquiries
  else if (lowerInput.includes('ktp') || lowerInput.includes('identitas')) {
    botResponse = `Untuk pembuatan atau perpanjangan KTP, Anda bisa datang ke kantor kelurahan dengan membawa:\n\n${pelayanan.ktp.syarat.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nJam operasional: ${kantor.hariBuka}, ${kantor.buka} - ${kantor.tutup}\nLama proses: ${pelayanan.ktp.lamaProses}`
  } 
  
  // KK inquiries
  else if (lowerInput.includes('kk') || lowerInput.includes('keluarga')) {
    botResponse = `Untuk pembuatan atau perubahan Kartu Keluarga, persyaratannya adalah:\n\n${pelayanan.kk.syarat.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nLama proses: ${pelayanan.kk.lamaProses}`
  } 
  
  // Tourism inquiries
  else if (lowerInput.includes('wisata') || lowerInput.includes('tempat menarik') || lowerInput.includes('potensi')) {
    botResponse = `${wilayah.nama} memiliki beberapa destinasi wisata menarik:\n\n${wisata.map(w => `${w.icon} ${w.nama} - ${w.deskripsi}`).join('\n\n')}\n\nAda yang ingin Anda ketahui lebih lanjut?`
  } 
  
  // Services inquiries
  else if (lowerInput.includes('pelayanan') || lowerInput.includes('layanan') || lowerInput.includes('surat')) {
    botResponse = `Berbagai pelayanan yang tersedia di Kelurahan ${wilayah.nama}:\n\n${pelayananList.map(p => `${p}`).join('\n')}\n\nJam operasional: ${kantor.hariBuka}, ${kantor.buka} - ${kantor.tutup}`
  } 
  
  // Contact inquiries - includes phone, telepon, telp, wa, whatsapp, kontak, hubungi
  else if (lowerInput.includes('kontak') || lowerInput.includes('hubungi') || lowerInput.includes('telepon') || lowerInput.includes('telp') || lowerInput.includes('no hp') || lowerInput.includes('wa') || lowerInput.includes('whatsapp')) {
    botResponse = `Berikut informasi kontak ${wilayah.nama}:\n\n📍 Alamat: ${alamatKantor.alamat}\n📞 Telepon: ${alamatKantor.telepon}\n📱 WhatsApp: ${alamatKantor.wa}\n\nJam operasional: ${kantor.hariBuka}, ${kantor.buka} - ${kantor.tutup}`
  } 
  
  // Thanks
  else if (lowerInput.includes('terima kasih') || lowerInput.includes('makasih') || lowerInput.includes('thanks') || lowerInput.includes('trims')) {
    botResponse = 'Sama-sama! 😊 Senang bisa membantu. Jika ada pertanyaan lain, jangan ragu untuk bertanya ya!'
  } 
  
  // News inquiries
  else if (lowerInput.includes('berita') || lowerInput.includes('kabar') || lowerInput.includes('info terbaru')) {
    botResponse = `Berita terbaru di ${wilayah.nama}:\n\n${beritaTerbaru.map(b => `${b.icon} ${b.judul} (${b.tanggal})\n${b.deskripsi}`).join('\n\n')}\n\nUntuk berita lebih lengkap, kunjungi halaman Berita di website ini!`
  } 
  
  // Help
  else if (lowerInput.includes('bantuan') || lowerInput.includes('help')) {
    botResponse = `Saya asisten AI ${wilayah.nama}. Saya bisa membantu dengan:\n\n${pelayananList.map(p => `• ${p}`).join('\n')}\n• Informasi wisata dan potensi lokal\n• Berita terbaru ${wilayah.nama}\n• Informasi kontak\n\nSilakan tanya sesuatu!`
  } 
  
  // Default fallback
  else {
    botResponse = `Mohon maaf, saya sedang dalam mode offline (tanpa koneksi AI). 🤖\n\nTapi saya bisa membantu dengan informasi dasar mengenai ${wilayah.nama}:\n\n${pelayananList.map(p => `• ${p}`).join('\n')}\n• Informasi wisata dan potensi lokal\n• Berita terbaru\n• Informasi kontak\n\nSilakan coba tanya sesuatu atau ketik "bantuan" untuk melihat opsi.`
  }

  return NextResponse.json({
    success: true,
    message: botResponse,
    conversationId: Date.now().toString(),
    provider: 'groq-offline',
    config: {
      contact: alamatKantor,
      wilayah: wilayah,
    },
  })
}

// Allow GET to check API status
export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: `${wilayah.nama} AI Chat`,
    provider: GROQ_API_KEY ? 'Groq AI (Online)' : 'Groq Offline (Fallback)',
    message: 'Chat API is ready to serve requests',
    config: {
      contact: alamatKantor,
      wilayah: wilayah,
    },
  })
}
