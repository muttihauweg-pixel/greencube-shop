'use client'

import { useState, useEffect, useMemo } from 'react'
import { ShoppingCart, Search, X, Plus, Minus, Trash2, Leaf, Phone, Mail, MapPin, CreditCard, Truck, ChevronRight, Filter, Sparkles, Star, Info, Check, MessageCircle, Send } from 'lucide-react'

// Produkt-Datenbank mit allen Sorten von hanfoase.at
const products = [
  {
    id: 1,
    name: "AK-47 Simons Cut",
    shortName: "AK-47",
    price: 18.00,
    type: "hybrid",
    thc: "20-24%",
    floweringTime: "8-9 Wochen",
    origin: "Russland / Holland",
    genetics: "Colombian × Mexican × Thai × Afghani",
    aroma: "würzig, erdig, holzig",
    effect: "entspannend, euphorisch, kreativ",
    description: "AK-47 ist ein legendärer Hybrid, bekannt für seine potente Wirkung und hohe THC-Konzentration. Die Simons Cut Variante bietet exzellente Genetik mit kräftigem Wuchs.",
    image: "/products/ak47.png",
    inStock: true,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Amnesia Core Cut",
    shortName: "Amnesia",
    price: 19.00,
    type: "sativa",
    thc: "22-25%",
    floweringTime: "10-11 Wochen",
    origin: "Holland",
    genetics: "Haze × Afghani Hawaiian",
    aroma: "erdig, Zitrus, Haze",
    effect: "stark psychoaktiv, kreativ, euphorisch",
    description: "Der Amnesia Core Cut ist ein preisgekrönter Sativa-Dominanter Hybrid mit extrem hoher Potenz. Bekannt für seine langanhaltende, zerebrale Wirkung.",
    image: "/products/amnesia_haze.png",
    inStock: true,
    badge: "Premium"
  },
  {
    id: 3,
    name: "Amnesia Master Core Cut",
    shortName: "Amnesia MC",
    price: 21.00,
    type: "sativa",
    thc: "24-26%",
    floweringTime: "10-12 Wochen",
    origin: "Holland",
    genetics: "Amnesia Haze × Master Kush",
    aroma: "intensiv Haze, Zitrus, Pinie",
    effect: "sehr stark psychoaktiv, kreativ",
    description: "Die Premium-Version des Amnesia Core Cut mit noch höherer Potenz und verbesserter Genetik. Für erfahrene Anwender empfohlen.",
    image: "/products/amnesia_haze.png",
    inStock: true,
    badge: "Limitiert"
  },
  {
    id: 4,
    name: "Black Cherry Punch",
    shortName: "BCP",
    price: 17.00,
    type: "indica",
    thc: "18-22%",
    floweringTime: "8-9 Wochen",
    origin: "USA",
    genetics: "Black Cherry Soda × Purple Punch",
    aroma: "süß, Kirsche, fruchtig",
    effect: "entspannend, sedierend, glücklich",
    description: "Black Cherry Punch besticht durch ihr einzigartiges Kirscharoma und die tief violette Färbung der Blüten. Ideal für den Abend.",
    image: "/products/black_cherry_punch.png",
    inStock: true,
    badge: null
  },
  {
    id: 5,
    name: "Candy Store",
    shortName: "Candy",
    price: 16.00,
    type: "hybrid",
    thc: "19-23%",
    floweringTime: "8-10 Wochen",
    origin: "Spanien",
    genetics: "Sweet Seeds Original",
    aroma: "süß, Karamell, fruchtig",
    effect: "entspannend, glücklich, kreativ",
    description: "Candy Store ist ein süßer Hybrid mit einem einzigartigen Karamell-Aroma. Perfekt für Anfänger und Genießer.",
    image: "/products/candy_store.png",
    inStock: true,
    badge: null
  },
  {
    id: 6,
    name: "Cap Junky",
    shortName: "Cap",
    price: 20.00,
    type: "hybrid",
    thc: "25-28%",
    floweringTime: "9-10 Wochen",
    origin: "USA",
    genetics: "Alien Cookies × Kush Mints #11",
    aroma: "Gas, Minze, Cookies",
    effect: "extrem potent, entspannend",
    description: "Cap Junky ist eine extrem potente neue Sorte mit Gas- und Minznoten. Für sehr erfahrene Konsumenten empfohlen.",
    image: "/products/gorilla_glue.png",
    inStock: true,
    badge: "Neu"
  },
  {
    id: 7,
    name: "Fizzy Bubble Gum",
    shortName: "FBG",
    price: 15.00,
    type: "hybrid",
    thc: "16-20%",
    floweringTime: "8-9 Wochen",
    origin: "Spanien",
    genetics: "Bubble Gum Selection",
    aroma: "Kaugummi, süß, fruchtig",
    effect: "entspannend, euphorisch, gesellig",
    description: "Fizzy Bubble Gum bringt den klassischen Kaugummi-Geschmack zurück. Ein freundlicher Hybrid für jeden Anlass.",
    image: "/products/runtz.png",
    inStock: true,
    badge: null
  },
  {
    id: 8,
    name: "Gelato #45",
    shortName: "Gelato",
    price: 18.00,
    type: "hybrid",
    thc: "20-25%",
    floweringTime: "8-9 Wochen",
    origin: "USA (Cookie Family)",
    genetics: "Sunset Sherbet × Thin Mint GSC",
    aroma: "süß, Zitrus, Beeren, Creme",
    effect: "ausgewogen, euphorisch, entspannend",
    description: "Gelato #45 ist ein Klassiker der Cookie Family mit perfekter Balance aus Indica und Sativa. Cremiges Aroma und potente Wirkung.",
    image: "/products/gelato.png",
    inStock: true,
    badge: "Favorite"
  },
  {
    id: 9,
    name: "Imperium X (Knolli Cut)",
    shortName: "Imperium",
    price: 21.00,
    type: "hybrid",
    thc: "26-30%",
    floweringTime: "9-11 Wochen",
    origin: "Österreich",
    genetics: "Cali Connection Selection",
    aroma: "Gas, Zitrus, erdig",
    effect: "extrem potent, langanhaltend",
    description: "Imperium X Knolli Cut ist eine der potentesten Sorten im Sortiment. Exklusive Genetik für Kenner und Profis.",
    image: "/products/og_kush.png",
    inStock: true,
    badge: "Top Shelf"
  },
  {
    id: 10,
    name: "Jokerz 31",
    shortName: "Jokerz",
    price: 19.00,
    type: "hybrid",
    thc: "22-26%",
    floweringTime: "8-9 Wochen",
    origin: "USA",
    genetics: "White Runtz × Jet Fuel Gelato",
    aroma: "Gas, süß, fruchtig",
    effect: "entspannend, glücklich, kreativ",
    description: "Jokerz 31 vereint die besten Eigenschaften von Runtz und Gelato. Ein vielseitiger Hybrid mit tollem Geschmacksprofil.",
    image: "/products/jokerz.png",
    inStock: true,
    badge: null
  },
  {
    id: 11,
    name: "Kush Mintz",
    shortName: "KM",
    price: 18.00,
    type: "hybrid",
    thc: "20-24%",
    floweringTime: "8-10 Wochen",
    origin: "USA",
    genetics: "Bubba Kush × Animal Mints",
    aroma: "Minze, erdig, süß",
    effect: "entspannend, klar, glücklich",
    description: "Kush Mintz bietet einen einzigartigen Minz-Geschmack mit klassischer Kush-Wirkung. Perfekt für den Alltag.",
    image: "/products/kush_mintz.png",
    inStock: true,
    badge: null
  },
  {
    id: 12,
    name: "La Bomba",
    shortName: "LAB",
    price: 17.00,
    type: "indica",
    thc: "18-22%",
    floweringTime: "7-8 Wochen",
    origin: "Spanien",
    genetics: "Bomb Seeds Original",
    aroma: "skunky, süß, erdig",
    effect: "entspannend, sedierend, hungrig",
    description: "La Bomba ist eine schnell blühende Indica mit kräftigem Wuchs und hohen Erträgen. Ideal für Anfänger.",
    image: "/products/super_skunk.png",
    inStock: true,
    badge: null
  },
  {
    id: 13,
    name: "Lilac Cookies",
    shortName: "LC",
    price: 19.00,
    type: "hybrid",
    thc: "22-26%",
    floweringTime: "9-10 Wochen",
    origin: "USA",
    genetics: "GSC × Lilac Diesel",
    aroma: "Flieder, süß, Cookies",
    effect: "entspannend, euphorisch, kreativ",
    description: "Lilac Cookies besticht durch ihre einzigartige lila Färbung und das komplexe Aromaprofil. Ein Genuss für alle Sinne.",
    image: "/products/lilac_cookies.png",
    inStock: true,
    badge: "Premium"
  },
  {
    id: 14,
    name: "Mimosa x Orange Punch",
    shortName: "MOP",
    price: 18.00,
    type: "sativa",
    thc: "20-24%",
    floweringTime: "9-10 Wochen",
    origin: "USA",
    genetics: "Mimosa × Purple Punch",
    aroma: "Orange, Zitrus, fruchtig",
    effect: "energetisch, kreativ, glücklich",
    description: "Mimosa x Orange Punch ist ein fruchtiger Sativa-Hybrid perfekt für den Tag. Toller Geschmack und motivierende Wirkung.",
    image: "/products/mimosa.png",
    inStock: true,
    badge: null
  },
  {
    id: 15,
    name: "Permanent Marker",
    shortName: "PM",
    price: 20.00,
    type: "hybrid",
    thc: "24-28%",
    floweringTime: "9-10 Wochen",
    origin: "USA",
    genetics: "Biscotti × Sherb Bx × Jealousy",
    aroma: "chemisch, süß, scharf",
    effect: "sehr potent, entspannend",
    description: "Permanent Marker ist bekannt für seinen einzigartigen, intensiven Geruch. Eine der potentesten Sorten im Sortiment.",
    image: "/products/permanent_marker.png",
    inStock: true,
    badge: "Exklusiv"
  },
  {
    id: 16,
    name: "Peyote Cookies",
    shortName: "PC",
    price: 18.00,
    type: "indica",
    thc: "20-24%",
    floweringTime: "8-9 Wochen",
    origin: "Spanien",
    genetics: "Peyote Purple × Cookies",
    aroma: "Kaffee, süß, erdig",
    effect: "entspannend, sedierend, glücklich",
    description: "Peyote Cookies vereint die besten Eigenschaften von Peyote Purple und Cookies. Wunderschöne violette Färbung.",
    image: "/products/peyote_cookies.png",
    inStock: true,
    badge: null
  },
  {
    id: 17,
    name: "Power Plant",
    shortName: "PP",
    price: 14.00,
    type: "sativa",
    thc: "15-20%",
    floweringTime: "8-9 Wochen",
    origin: "Südafrika",
    genetics: "African Landrace",
    aroma: "erdig, holzig, würzig",
    effect: "energetisch, kreativ, klar",
    description: "Power Plant ist ein klassischer Sativa mit afrikanischen Wurzeln. Bekannt für hohe Erträge und energiegeladene Wirkung.",
    image: "/products/power_plant.png",
    inStock: true,
    badge: "Günstig"
  },
  {
    id: 18,
    name: "Rainbow Sherbet #11",
    shortName: "RS11",
    price: 19.00,
    type: "hybrid",
    thc: "22-26%",
    floweringTime: "9-10 Wochen",
    origin: "USA",
    genetics: "Rainbow Sherbet × Pink Guava",
    aroma: "tropisch, süß, fruchtig",
    effect: "entspannend, euphorisch, kreativ",
    description: "Rainbow Sherbet #11 bietet ein explosionsartiges Geschmackserlebnis mit tropischen Noten. Beliebte Cali-Sorte.",
    image: "/products/runtz.png",
    inStock: true,
    badge: null
  },
  {
    id: 19,
    name: "Sherb Cream Pie",
    shortName: "SCP",
    price: 18.00,
    type: "hybrid",
    thc: "20-24%",
    floweringTime: "8-9 Wochen",
    origin: "USA",
    genetics: "Sunset Sherbet × Cream Pie",
    aroma: "cremig, süß, Beeren",
    effect: "entspannend, glücklich, hungrig",
    description: "Sherb Cream Pie ist ein cremiger Traum mit intensiven Beerennoten. Perfekt für den entspannten Abend.",
    image: "/products/sherb_cream_pie.png",
    inStock: true,
    badge: null
  },
  {
    id: 20,
    name: "Sleepy Joe",
    shortName: "SL",
    price: 16.00,
    type: "indica",
    thc: "18-22%",
    floweringTime: "8-9 Wochen",
    origin: "USA",
    genetics: "Do-Si-Dos × Purple Punch",
    aroma: "erdig, süß, Pinie",
    effect: "sedierend, entspannend, müde",
    description: "Sleepy Joe ist die perfekte Sorte für einen ruhigen Schlaf. Starke Indica-Wirkung mit süßem Aroma.",
    image: "/products/northern_lights.png",
    inStock: true,
    badge: "Nacht"
  },
  {
    id: 21,
    name: "Super Buff Cherry",
    shortName: "SBC",
    price: 17.00,
    type: "hybrid",
    thc: "20-23%",
    floweringTime: "8-9 Wochen",
    origin: "USA",
    genetics: "Cherry Buff × Super Buff",
    aroma: "Kirsche, süß, fruchtig",
    effect: "entspannend, euphorisch, kreativ",
    description: "Super Buff Cherry bietet intensives Kirscharoma mit potenter Wirkung. Ein vielseitiger Hybrid.",
    image: "/products/black_cherry_punch.png",
    inStock: true,
    badge: null
  },
  {
    id: 22,
    name: "Super Orange Glue",
    shortName: "SOG",
    price: 17.00,
    type: "hybrid",
    thc: "20-24%",
    floweringTime: "8-10 Wochen",
    origin: "Holland",
    genetics: "Super Orange Haze × Gorilla Glue",
    aroma: "Orange, Zitrus, Klebstoff",
    effect: "entspannend, euphorisch, kreativ",
    description: "Super Orange Glue kombiniert die besten Eigenschaften von Haze und Gorilla Glue. Einzigartiges Aromaprofil.",
    image: "/products/gorilla_glue.png",
    inStock: true,
    badge: null
  },
  {
    id: 23,
    name: "Super Silver Haze",
    shortName: "SSH",
    price: 18.00,
    type: "sativa",
    thc: "20-24%",
    floweringTime: "10-11 Wochen",
    origin: "Holland",
    genetics: "Skunk × Northern Lights × Haze",
    aroma: "Zitrus, würzig, Haze",
    effect: "energetisch, kreativ, euphorisch",
    description: "Super Silver Haze ist ein preisgekrönter Sativa-Klassiker mit silbrigem Glanz. Bekannt für langanhaltende Wirkung.",
    image: "/products/super_silver_haze.png",
    inStock: true,
    badge: "Klassiker"
  },
  {
    id: 24,
    name: "Wedding Cake",
    shortName: "WED",
    price: 18.00,
    type: "indica",
    thc: "22-26%",
    floweringTime: "8-9 Wochen",
    origin: "USA",
    genetics: "Triangle Kush × Animal Mints",
    aroma: "süß, Vanille, Creme",
    effect: "entspannend, euphorisch, hungrig",
    description: "Wedding Cake ist ein beliebter Indica-Hybrid mit cremigem Vanillearoma. Perfekt für besondere Anlässe.",
    image: "/products/wedding_cake.png",
    inStock: true,
    badge: "Beliebt"
  },
  {
    id: 25,
    name: "White Russian",
    shortName: "WR",
    price: 15.00,
    type: "hybrid",
    thc: "18-22%",
    floweringTime: "8-9 Wochen",
    origin: "Holland",
    genetics: "White Widow × AK-47",
    aroma: "Zitrus, süß, erdig",
    effect: "entspannend, kreativ, glücklich",
    description: "White Russian vereint zwei legendäre Sorten. Frostige Blüten mit ausgewogener Hybrid-Wirkung.",
    image: "/products/white_russian.png",
    inStock: true,
    badge: null
  }
]

// Versandkosten basierend auf Land
const shippingCosts: Record<string, { cost: number; freeFrom: number }> = {
  'AT': { cost: 6.90, freeFrom: 100 },
  'DE': { cost: 9.90, freeFrom: 150 },
  'CH': { cost: 14.90, freeFrom: 200 },
  'IT': { cost: 12.90, freeFrom: 180 },
  'SI': { cost: 12.90, freeFrom: 180 },
  'HU': { cost: 12.90, freeFrom: 180 },
  'CZ': { cost: 12.90, freeFrom: 180 },
  'SK': { cost: 12.90, freeFrom: 180 }
}

interface CartItem {
  product: typeof products[0]
  quantity: number
}

interface CustomerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  zip: string
  city: string
  country: string
}

export default function HanfstecklingShop() {
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('hanfstecklingCart')
      if (savedCart) {
        return JSON.parse(savedCart)
      }
    }
    return []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showProductModal, setShowProductModal] = useState<typeof products[0] | null>(null)
  const [orderSent, setOrderSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    zip: '',
    city: '',
    country: 'AT'
  })

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('hanfstecklingCart', JSON.stringify(cart))
  }, [cart])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.aroma.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(p => p.type === filterType)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'thc': return parseInt(b.thc) - parseInt(a.thc)
        default: return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, filterType, sortBy])

  // Cart functions
  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(0, item.quantity + delta)
        return newQty === 0 ? null : { ...item, quantity: newQty }
      }
      return item
    }).filter(Boolean) as CartItem[])
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const getShippingCost = () => {
    const country = customerData.country
    const shipping = shippingCosts[country] || { cost: 9.90, freeFrom: 150 }
    return cartTotal >= shipping.freeFrom ? 0 : shipping.cost
  }

  const generateWhatsAppMessage = () => {
    const items = cart.map(item =>
      `• ${item.product.name} x${item.quantity} = €${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n')

    return encodeURIComponent(`🌿 NEUE BESTELLUNG - Hanfstecklinge\n\n${items}\n\n📦 Zwischensumme: €${cartTotal.toFixed(2)}\n🚚 Versand: €${getShippingCost().toFixed(2)}\n💰 Gesamt: €${(cartTotal + getShippingCost()).toFixed(2)}\n\n👤 ${customerData.firstName} ${customerData.lastName}\n📧 ${customerData.email}\n📱 ${customerData.phone}\n📍 ${customerData.street}, ${customerData.zip} ${customerData.city}, ${customerData.country}`)
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuliere Firebase/Email-Versand
    const orderData = {
      customer: customerData,
      items: cart,
      subtotal: cartTotal,
      shipping: getShippingCost(),
      total: cartTotal + getShippingCost(),
      timestamp: new Date().toISOString()
    }

    console.log('Bestelldaten für Firebase:', orderData)

    // Simuliere API-Aufruf
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In Produktion: Firebase Function aufrufen
    // await fetch('/api/sendOrder', {
    //   method: 'POST',
    //   body: JSON.stringify(orderData)
    // })

    setIsLoading(false)
    setOrderSent(true)
    setCart([])
    localStorage.removeItem('hanfstecklingCart')
  }

  const resetOrder = () => {
    setOrderSent(false)
    setShowCheckout(false)
    setCustomerData({
      firstName: '', lastName: '', email: '', phone: '',
      street: '', zip: '', city: '', country: 'AT'
    })
  }

  if (orderSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center border border-emerald-500/20 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Bestellung erfolgreich!</h2>
          <p className="text-gray-400 mb-6">
            Vielen Dank für Ihre Bestellung! Sie erhalten eine Bestätigungs-E-Mail mit den Bankdaten für die Vorkasse.
          </p>
          <button
            onClick={resetOrder}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-8 rounded-xl transition-all"
          >
            Weiter einkaufen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HansHanf</h1>
                <p className="text-xs text-emerald-400">Premium Hanfstecklinge</p>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Sorten suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-3 transition-all"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Sorten suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 text-sm">Filter:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'indica', 'sativa', 'hybrid'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterType === type
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {type === 'all' ? 'Alle' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl py-2 px-4 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="name">Name A-Z</option>
              <option value="price-asc">Preis aufsteigend</option>
              <option value="price-desc">Preis absteigend</option>
              <option value="thc">THC-Gehalt</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => setShowProductModal(product)}
                  className="absolute top-3 right-3 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Info className="w-5 h-5" />
                </button>
                <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                  product.type === 'indica' ? 'bg-purple-500/80 text-white' :
                  product.type === 'sativa' ? 'bg-orange-500/80 text-white' :
                  'bg-blue-500/80 text-white'
                }`}>
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1 truncate">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{product.aroma}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-emerald-400">€{product.price.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm ml-1">/ Steckling</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-xs">THC</span>
                    <p className="text-white font-medium">{product.thc}</p>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  In den Warenkorb
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Leaf className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Keine Sorten gefunden</p>
            <p className="text-gray-500 text-sm mt-2">Versuchen Sie andere Suchbegriffe</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-gray-900 h-full overflow-y-auto border-l border-gray-700">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Warenkorb</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Ihr Warenkorb ist leer</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-4 bg-gray-800 rounded-xl p-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{item.product.name}</h4>
                          <p className="text-emerald-400 font-semibold">€{item.product.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-600"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-600"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Zwischensumme</span>
                      <span>€{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white text-lg font-bold">
                      <span>Gesamt</span>
                      <span className="text-emerald-400">€{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => {
                        setShowCart(false)
                        setShowCheckout(true)
                      }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-4 rounded-xl transition-all"
                    >
                      Zur Kasse
                    </button>

                    <a
                      href={`https://wa.me/436601234567?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Via WhatsApp bestellen
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Checkout</h2>
              <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Vorname *</label>
                  <input
                    type="text"
                    required
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Nachname *</label>
                  <input
                    type="text"
                    required
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Straße *</label>
                  <input
                    type="text"
                    required
                    value={customerData.street}
                    onChange={(e) => setCustomerData({ ...customerData, street: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">PLZ *</label>
                  <input
                    type="text"
                    required
                    value={customerData.zip}
                    onChange={(e) => setCustomerData({ ...customerData, zip: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Stadt *</label>
                  <input
                    type="text"
                    required
                    value={customerData.city}
                    onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Land *</label>
                  <select
                    required
                    value={customerData.country}
                    onChange={(e) => setCustomerData({ ...customerData, country: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="AT">Österreich</option>
                    <option value="DE">Deutschland</option>
                    <option value="CH">Schweiz</option>
                    <option value="IT">Italien</option>
                    <option value="SI">Slowenien</option>
                    <option value="HU">Ungarn</option>
                    <option value="CZ">Tschechien</option>
                    <option value="SK">Slowakei</option>
                  </select>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-800 rounded-2xl p-4 mb-6">
                <h3 className="text-white font-semibold mb-4">Bestellübersicht</h3>
                <div className="space-y-2 text-sm">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between text-gray-400">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>€{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-700 my-3" />
                  <div className="flex justify-between text-gray-400">
                    <span>Zwischensumme</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Versand</span>
                    <span className={getShippingCost() === 0 ? 'text-emerald-400' : ''}>
                      {getShippingCost() === 0 ? 'Kostenlos!' : `€${getShippingCost().toFixed(2)}`}
                    </span>
                  </div>
                  {getShippingCost() > 0 && (
                    <p className="text-xs text-gray-500">
                      Kostenloser Versand ab €{shippingCosts[customerData.country]?.freeFrom || 150}
                    </p>
                  )}
                  <div className="border-t border-gray-700 my-3" />
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Gesamt</span>
                    <span className="text-emerald-400">€{(cartTotal + getShippingCost()).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-800/50 rounded-2xl p-4 mb-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-semibold">Zahlung: Vorkasse</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Die Bankdaten erhalten Sie per E-Mail nach der Bestellung. Die Lieferung erfolgt nach Zahlungseingang.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Bestellung absenden
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/436601234567?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Via WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowProductModal(null)} />
          <div className="relative bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <button
              onClick={() => setShowProductModal(null)}
              className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={showProductModal.image}
                  alt={showProductModal.name}
                  className="w-full h-full object-cover md:rounded-l-3xl"
                />
                {showProductModal.badge && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                    {showProductModal.badge}
                  </span>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    showProductModal.type === 'indica' ? 'bg-purple-500/20 text-purple-400' :
                    showProductModal.type === 'sativa' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {showProductModal.type.charAt(0).toUpperCase() + showProductModal.type.slice(1)}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">{showProductModal.thc} THC</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{showProductModal.name}</h2>

                <p className="text-gray-400 mb-6">{showProductModal.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <span className="text-gray-500 text-sm">Herkunft</span>
                    <p className="text-white font-medium">{showProductModal.origin}</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <span className="text-gray-500 text-sm">Blütezeit</span>
                    <p className="text-white font-medium">{showProductModal.floweringTime}</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <span className="text-gray-500 text-sm">Genetik</span>
                    <p className="text-white font-medium text-sm">{showProductModal.genetics}</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <span className="text-gray-500 text-sm">Aroma</span>
                    <p className="text-white font-medium">{showProductModal.aroma}</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-4 mb-6">
                  <span className="text-gray-500 text-sm">Wirkung</span>
                  <p className="text-white font-medium">{showProductModal.effect}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-emerald-400">€{showProductModal.price.toFixed(2)}</span>
                    <span className="text-gray-500 ml-2">/ Steckling</span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(showProductModal)
                      setShowProductModal(null)
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    In den Warenkorb
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">HansHanf</h3>
                  <p className="text-xs text-emerald-400">Premium Hanfstecklinge</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Qualitätsgenützte Hanfstecklinge aus Österreich. Diskreter Versand in ganz Europa.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Versand</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Österreich: €6.90 (ab €100 kostenlos)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Deutschland: €9.90 (ab €150 kostenlos)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>info@hanshanf.at</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>+43 660 123 45 67</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 HansHanf. Alle Rechte vorbehalten.</p>
            <p className="mt-2">Nur für Personen ab 18 Jahren. Bitte beachte die gesetzlichen Bestimmungen in deinem Land.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
