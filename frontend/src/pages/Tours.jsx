import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, ArrowRight, Filter } from 'lucide-react'

const TOURS = [
  { id: 1, name: 'Goa', tagline: 'Sun, Sand & Serenity', location: 'Goa', tags: ['Adventure', 'Romantic'], price: '₹6,000+', season: 'Nov – Feb', img: 'https://voiceofadventure.com/wp-content/uploads/2022/06/60d0813807aff-Baga_Beach_In_Goa.jpg', highlight: true },
  { id: 2, name: 'Andaman & Nicobar', tagline: 'Tropical Island Paradise', location: 'Andaman & Nicobar', tags: ['Adventure', 'Romantic'], price: '₹10,000+', season: 'Oct – May', img: 'https://th.bing.com/th/id/OIP.jgaqDgklk_-mW65FoJHSzAHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 3, name: 'Pondicherry', tagline: 'French Riviera of India', location: 'Puducherry', tags: ['Romantic', 'Solo'], price: '₹5,000+', season: 'Oct – Mar', img: 'https://www.holidify.com/images/bgImages/PONDICHERRY.jpg' },
  { id: 4, name: 'Manali', tagline: 'Valley of the Gods', location: 'Himachal Pradesh', tags: ['Adventure', 'Romantic'], price: '₹5,000+', season: 'Mar – Jun', img: 'https://images.pexels.com/photos/28680808/pexels-photo-28680808.jpeg?cs=srgb&dl=pexels-ansh-kumar-3935136-28680808.jpg&fm=jpg' },
  { id: 5, name: 'Shimla', tagline: 'Queen of Hills', location: 'Himachal Pradesh', tags: ['Family', 'Romantic'], price: '₹4,000+', season: 'Mar – Jun', img: 'https://tse4.mm.bing.net/th/id/OIP.hSNLQv20D4cu1d74OsgMIgHaEO?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 6, name: 'Munnar', tagline: 'Tea Garden Paradise', location: 'Kerala', tags: ['Romantic', 'Family'], price: '₹5,000+', season: 'Sep – Mar', img: 'https://www.revv.co.in/blogs/wp-content/uploads/2021/02/Munnar-HD-Image.jpg' },
  { id: 7, name: 'Darjeeling', tagline: 'Land of Thunder Bolt', location: 'West Bengal', tags: ['Romantic', 'Solo'], price: '₹4,500+', season: 'Oct – Apr', img: 'https://wallpapercave.com/wp/wp6191685.jpg' },
  { id: 8, name: 'Ladakh', tagline: 'Land of High Passes', location: 'Ladakh', tags: ['Adventure', 'Solo'], price: '₹12,000+', season: 'May – Sep', img: 'https://t3.ftcdn.net/jpg/02/64/31/46/360_F_264314658_bMWblZcsJj9XTTwkOo1l4Z3eOIx9T3Qv.jpg' },
  { id: 9, name: 'Jaipur', tagline: 'Pink City', location: 'Rajasthan', tags: ['Family', 'Spiritual'], price: '₹5,000+', season: 'Oct – Mar', img: 'https://media.istockphoto.com/id/482557081/photo/hawa-mahal-jaipur-india.jpg?s=612x612&w=0&k=20&c=A6qCUjoNH74nXCkB07RNgK3eIt2mun8PgsLPw9dNkVI=' },
  { id: 10, name: 'Udaipur', tagline: 'City of Lakes', location: 'Rajasthan', tags: ['Romantic', 'Family'], price: '₹6,000+', season: 'Oct – Mar', img: 'https://map.sahapedia.org/admin/assets/images/2021033013400727799_Banner.jpg?__imr__=bannerMuseum' },
  { id: 11, name: 'Agra', tagline: 'City of the Taj Mahal', location: 'Uttar Pradesh', tags: ['Family', 'Romantic'], price: '₹4,000+', season: 'Oct – Mar', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80' },
  { id: 12, name: 'Varanasi', tagline: 'City of Light', location: 'Uttar Pradesh', tags: ['Spiritual', 'Solo'], price: '₹3,500+', season: 'Oct – Mar', img: 'https://tse2.mm.bing.net/th/id/OIP.4vczHYikRKBhf8YZrmZHpwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 13, name: 'Hampi', tagline: 'City of Ruins', location: 'Karnataka', tags: ['Spiritual', 'Solo'], price: '₹3,500+', season: 'Oct – Feb', img: 'https://th.bing.com/th/id/R.2cdc497c83968a20809bc31b6656665f?rik=PYxuGetMHaVXMA&riu=http%3a%2f%2fwww.thehistoryhub.com%2fwp-content%2fuploads%2f2014%2f04%2fVirupaksha-Temple-of-Hampi.jpg&ehk=b0Dt0dOD8no1s7z5pLO9o5rRlZcGO6VmGRZR%2bcjGn5w%3d&risl=&pid=ImgRaw&r=0' },
  { id: 14, name: 'Rishikesh', tagline: 'Yoga Capital of the World', location: 'Uttarakhand', tags: ['Adventure', 'Spiritual'], price: '₹4,000+', season: 'Feb – May', img: 'https://tse1.mm.bing.net/th/id/OIP.55boTMM8hcy4qEz7fAEb_gHaED?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 15, name: 'Coorg', tagline: 'Scotland of India', location: 'Karnataka', tags: ['Romantic', 'Adventure'], price: '₹5,500+', season: 'Oct – May', img: 'https://t4.ftcdn.net/jpg/08/66/94/01/360_F_866940191_ud3TRZ47bmZQar43zlesyDNTDo5yNm81.jpg' },
  { id: 16, name: 'Gangtok', tagline: 'Gateway to Sikkim', location: 'Sikkim', tags: ['Adventure', 'Family'], price: '₹6,000+', season: 'Mar – Jun', img: 'https://media.istockphoto.com/id/515792454/photo/buddha-park-ravangla.jpg?s=612x612&w=0&k=20&c=6R5vX7MAdFUdSIhH4zTbTxub2JEc6fak880ardwWNaE=' },
  { id: 17, name: 'Delhi', tagline: 'Heart of India', location: 'Delhi', tags: ['Family', 'Spiritual'], price: '₹3,000+', season: 'Oct – Mar', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80' },
  { id: 18, name: 'Mumbai', tagline: 'City of Dreams', location: 'Maharashtra', tags: ['Solo', 'Adventure'], price: '₹4,000+', season: 'Nov – Feb', img: 'https://www.oyorooms.com/blog/wp-content/uploads/2017/12/iStock-539018660-min.jpg' },
  { id: 19, name: 'Chennai', tagline: 'City of Food', location: 'Maharashtra', tags: ['Solo', 'Family'], price: '₹3,500+', season: '', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80' },
  { id: 20, name: 'Hyderabad', tagline: 'City of Pearls', location: 'Telangana', tags: ['Family', 'Spiritual'], price: '₹3,000+', season: 'Oct – Feb', img: 'https://tse1.mm.bing.net/th/id/OIP.7IrJMGZmyQZaalL-laIdNwHaE5?rs=1&pid=ImgDetMain&o=7&rm=3' },
]

const TAG_FILTERS = ['All', 'Adventure', 'Romantic', 'Family', 'Spiritual', 'Solo']
const TAG_COLORS = {
  Adventure: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  Romantic: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Family: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Spiritual: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Solo: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

export default function Tours() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = TOURS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tagline.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || t.tags.includes(filter)
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-tag mx-auto w-fit"><MapPin className="w-3.5 h-3.5" /> 20 Destinations</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="gradient-text">Tours</span>
          </h1>
          <p className="text-slate-400">20 handpicked destinations across India — click any to plan</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search destinations or vibes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {TAG_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  filter === f
                    ? 'bg-teal-500 border-teal-500 text-navy-950'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="space-y-3">
          {filtered.map((tour, i) => (
            <Link
              key={tour.id}
              to="/planner"
              className="group flex items-center gap-4 glass rounded-2xl p-4 hover:border-teal-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 font-display font-bold text-white text-center flex items-center justify-center bg-teal-500/20 text-teal-400">
                {tour.id}
              </div>

              <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                <img src={tour.img} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-white group-hover:text-teal-400 transition-colors">{tour.name}</h3>
                  <div className="flex gap-1.5">
                    {tour.tags.map(tag => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border ${TAG_COLORS[tag] || 'bg-slate-500/20 text-slate-400'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-400 text-sm truncate">{tour.tagline} · <span className="text-slate-500">{tour.location}</span></p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-teal-400">{tour.price}</div>
                {tour.season && <div className="text-slate-500 text-xs mt-0.5">{tour.season}</div>}
              </div>

              <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            No destinations found. Try a different search or filter.
          </div>
        )}
      </div>
    </div>
  )
}
