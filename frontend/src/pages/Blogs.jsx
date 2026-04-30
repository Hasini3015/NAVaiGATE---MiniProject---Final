import { Calendar, User, Tag } from 'lucide-react'

const BLOGS = [
  { id: 1, category: 'TRAVEL TIPS', title: 'Top 10 Hidden Beaches in Goa You Must Visit', excerpt: 'Beyond the crowded shores of Baga and Calangute lie pristine stretches of sand waiting to be discovered.', author: 'Priya Nair', date: 'Apr 12, 2026', img: 'https://static.toiimg.com/photo/msid-55310626,width-96,height-65.cms' },
  { id: 2, category: 'ADVENTURE', title: 'The Complete Ladakh Road Trip Guide 2026', excerpt: "From Manali to Leh — everything you need to know about India's most epic road trip.", author: 'Rahul Sharma', date: 'Mar 28, 2026', img: 'https://t3.ftcdn.net/jpg/02/64/31/46/360_F_264314658_bMWblZcsJj9XTTwkOo1l4Z3eOIx9T3Qv.jpg' },
  { id: 3, category: 'BUDGET TRAVEL', title: 'Budget Travel in Rajasthan: 500/Day Guide', excerpt: 'Explore palaces, forts, and desert landscapes without breaking the bank.', author: 'Anita Joshi', date: 'Mar 15, 2026', img: 'https://media1.thrillophilia.com/filestore/3h5fmemhayi8bpwv75nr4c3hm2uh_amer-fort-jaipur.webp' },
  { id: 4, category: 'EXPERIENCES', title: 'Kerala Backwaters: A Houseboat Experience', excerpt: "Gliding through the tranquil waterways of God's Own Country on a traditional kettuvallam.", author: 'Vivek Menon', date: 'Feb 22, 2026', img: 'https://t3.ftcdn.net/jpg/01/08/55/78/360_F_108557824_iOniaszrOZyAalGyShUPaTVlwI9zzRJX.jpg' },
  { id: 5, category: 'SEASONAL', title: 'Best Time to Visit Manali: Month by Month', excerpt: 'Snow, adventure, and stunning views — but when should you actually go?', author: 'Meera Singh', date: 'Feb 10, 2026', img: 'https://wallpaperaccess.com/full/3548729.jpg' },
  { id: 6, category: 'CULTURE', title: 'Pondicherry: Where India Meets France', excerpt: 'Explore the French Quarter, pristine beaches, and spiritual Auroville in this charming union territory.', author: 'Arjun Mehta', date: 'Jan 30, 2026', img: 'https://tse4.mm.bing.net/th/id/OIP.d_PLC_UsANXjD2QMcvsptAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
]

const CAT_COLORS = {
  'TRAVEL TIPS': 'text-teal-400 bg-teal-500/10',
  'ADVENTURE': 'text-blue-400 bg-blue-500/10',
  'BUDGET TRAVEL': 'text-green-400 bg-green-500/10',
  'EXPERIENCES': 'text-purple-400 bg-purple-500/10',
  'SEASONAL': 'text-amber-400 bg-amber-500/10',
  'CULTURE': 'text-pink-400 bg-pink-500/10',
}

export default function Blogs() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto w-fit"><Tag className="w-3.5 h-3.5" /> Travel Blogs</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Travel <span className="gradient-text">Blogs</span>
          </h1>
          <p className="text-slate-400">Stories, tips, and guides from India's most beautiful destinations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.map(blog => (
            <div key={blog.id} className="group rounded-2xl overflow-hidden glass hover:border-teal-500/20 transition-all duration-300 cursor-pointer flex flex-col">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className={"text-xs font-mono font-medium px-2 py-1 rounded w-fit " + (CAT_COLORS[blog.category] || 'text-slate-400')}>{blog.category}</span>
                <h3 className="font-display font-bold text-white mt-3 mb-2 group-hover:text-teal-400 transition-colors leading-tight flex-1">{blog.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {blog.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
