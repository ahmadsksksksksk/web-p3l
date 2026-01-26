'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send, Bot, User, Minimize2, Wifi, WifiOff } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  provider?: string
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya asisten AI Tanjung Barat. Ada yang bisa saya bantu hari ini? 😊',
      sender: 'bot',
      timestamp: new Date(),
      provider: 'groq-offline',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Check API status on mount
  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    try {
      const response = await fetch('/api/chat')
      const data = await response.json()
      setIsOnline(data.provider?.includes('Online') || false)
    } catch (error) {
      setIsOnline(false)
    }
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Get conversation history (excluding system message)
      const history = messages
        .filter(m => m.sender !== 'bot' || m.id !== '1') // Exclude initial greeting
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))

      // Call API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          conversationId,
          history,
        }),
      })

      const data = await response.json()

      if (data.success && data.message) {
        // Update conversation ID if first message
        if (!conversationId && data.conversationId) {
          setConversationId(data.conversationId)
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.message,
          sender: 'bot',
          timestamp: new Date(),
          provider: data.provider,
        }

        setMessages((prev) => [...prev, botMessage])

        // Update online status based on response
        setIsOnline(data.provider === 'groq-online')
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat Error:', error)
      
      // Better fallback with intelligent responses
      let botResponse = ''
      const lowerInput = userMessage.text.toLowerCase()

      if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hi')) {
        botResponse = 'Halo! Selamat datang di Tanjung Barat. Ada yang bisa saya bantu? 😊'
      } else if (lowerInput.includes('ktp') || lowerInput.includes('identitas')) {
        botResponse = 'Untuk pembuatan atau perpanjangan KTP, Anda bisa datang ke kantor kelurahan dengan membawa:\n\n1. Kartu Keluarga (KK)\n2. Surat Pengantar RT/RW\n3. Pas foto 3x4\n\nJam operasional: Senin-Jumat, 08:00-16:00 WIB\n\nLama proses: 7-14 hari kerja'
      } else if (lowerInput.includes('kk') || lowerInput.includes('keluarga')) {
        botResponse = 'Untuk pembuatan atau perubahan Kartu Keluarga, persyaratannya adalah:\n\n1. KTP suami dan istri\n2. Buku Nikah atau Akta Cerai\n3. Surat Pengantar RT/RW\n\nLama proses: 3-7 hari kerja'
      } else if (lowerInput.includes('wisata') || lowerInput.includes('tempat menarik') || lowerInput.includes('potensi')) {
        botResponse = 'Tanjung Barat memiliki beberapa destinasi wisata menarik:\n\n🌳 Taman Kota Tanjung Barat - Taman asri dengan fasilitas bermain anak\n🏞️ Situ (Danau) Tanjung Barat - Danau dengan pemandangan indah\n🍜 Kuliner Tradisional Pasar Minggu - Berbagai makanan khas\n🏛️ Museum Sejarah Lokal - Koleksi sejarah dan budaya\n\nAda yang ingin Anda ketahui lebih lanjut?'
      } else if (lowerInput.includes('pelayanan') || lowerInput.includes('layanan') || lowerInput.includes('surat')) {
        botResponse = 'Berbagai pelayanan yang tersedia di Kelurahan Tanjung Barat:\n\n📋 Administrasi Kependudukan (KTP, KK, Akta Kelahiran)\n🤝 Pelayanan Sosial (Bansos, Kesehatan Lansia)\n📄 Perizinan & Fasilitas (Domisili, Izin Keramaian)\n📮 Pengaduan & Konsultasi\n\nJam operasional: Senin-Jumat, 08:00-16:00 WIB'
      } else if (lowerInput.includes('kontak') || lowerInput.includes('hubungi') || lowerInput.includes('telepon')) {
        botResponse = 'Berikut informasi kontak Tanjung Barat:\n\n📍 Alamat: Jalan Tanjung Barat No. 123, Jakarta Selatan\n📞 Telepon: (021) 123-4567\n📧 Email: info@tanjungbarat.go.id\n\nJam Operasional: Senin-Jumat, 08:00-16:00 WIB'
      } else if (lowerInput.includes('terima kasih') || lowerInput.includes('makasih') || lowerInput.includes('thanks')) {
        botResponse = 'Sama-sama! 😊 Senang bisa membantu. Jika ada pertanyaan lain, jangan ragu untuk bertanya ya!'
      } else if (lowerInput.includes('berita') || lowerInput.includes('kabar') || lowerInput.includes('info terbaru')) {
        botResponse = 'Berita terbaru di Tanjung Barat:\n\n✅ Peresmian Taman Baru (15 Januari 2025)\n✅ Program Kesehatan Gratis untuk Lansia (12 Januari 2025)\n✅ Penghargaan Adipura untuk Kebersihan (10 Januari 2025)\n\nUntuk berita lebih lengkap, kunjungi halaman Berita di website ini!'
      } else {
        botResponse = 'Mohon maaf, saya sedang dalam mode offline (tanpa koneksi AI). 🤖\n\nTapi saya bisa membantu dengan informasi dasar mengenai:\n\n• Pelayanan administrasi (KTP, KK, dll)\n• Informasi wisata dan potensi lokal\n• Berita terbaru Tanjung Barat\n• Informasi kontak\n\nSilakan coba tanya sesuatu atau katakan "bantuan" untuk melihat opsi.'
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        provider: 'groq-offline',
      }

      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className={index > 0 ? 'mt-2' : ''}>
        {line}
      </p>
    ))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl gap-2 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] sm:w-96">
      <Card className="shadow-2xl">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Asisten AI Tanjung Barat</CardTitle>
              <div className="text-xs text-primary-foreground/80 flex items-center gap-1">
                {isOnline ? (
                  <>
                    <Wifi className="h-3 w-3" />
                    <span>Online - Groq AI</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    <span>Offline - Respon dasar</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-4">
              <ScrollArea className="h-80 pr-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex gap-2 max-w-[80%] ${
                          message.sender === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div
                            className={`rounded-lg px-4 py-2 text-sm ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {formatMessage(message.text)}
                          </div>
                          <div className="text-xs text-muted-foreground px-1">
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-3">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-100" />
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pesan..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                {isTyping ? (
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    AI sedang merespon...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    {isOnline ? 'Online - Didukung Groq AI (GRATIS)' : 'Offline - Respon dasar'}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
