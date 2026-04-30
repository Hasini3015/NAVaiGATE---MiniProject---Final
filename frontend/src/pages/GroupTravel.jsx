import { Users } from 'lucide-react'

const GROUP_TRIPS = [
  {
    id: 1,
    dest: "Goa",
    type: "Adventure",
    date: "May 15-20, 2026",
    price: "₹12,000/person",
    spots: "4/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://t3.ftcdn.net/jpg/00/77/00/26/360_F_77002615_Gl1Hk6qZpi2xCAlX8EUTRLBqC4ei6QfC.jpg"
  },
  {
    id: 2,
    dest: "Andaman",
    type: "Adventure",
    date: "June 5-10, 2026",
    price: "₹28,000/person",
    spots: "3/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://images.pexels.com/photos/14313849/pexels-photo-14313849.jpeg?cs=srgb&dl=pexels-vishal-jadav-41034772-14313849.jpg&fm=jpg"
  },
  {
    id: 3,
    dest: "Pondicherry",
    type: "Romantic",
    date: "July 10-14, 2026",
    price: "₹11,000/person",
    spots: "5/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://www.shutterstock.com/shutterstock/videos/3554154825/thumb/1.jpg?ip=x480"
  },
  {
    id: 4,
    dest: "Manali",
    type: "Adventure",
    date: "June 20-27, 2026",
    price: "₹15,000/person",
    spots: "2/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://t4.ftcdn.net/jpg/02/57/91/21/360_F_257912197_ySuBhefKYPQIZNa3xeGiObLpgYBnH9U5.jpg"
  },
  {
    id: 5,
    dest: "Shimla",
    type: "Adventure",
    date: "July 1-6, 2026",
    price: "₹14,000/person",
    spots: "4/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://media.gettyimages.com/id/1316591777/video/4k-drone-shot-of-beautiful-snowcapped-himalayan-mountain-range-and-hills-of-shimla.jpg?s=640x640&k=20&c=NPE_QJrnOxM5HPJliCsMQWySWnIM7glTSfOTQC1dnu4="
  },
  {
    id: 6,
    dest: "Munnar",
    type: "Romantic",
    date: "August 2-7, 2026",
    price: "₹13,500/person",
    spots: "3/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJa-iaNF1Lx1MrYFVvftqDeJDWuUgkOKo29w&s"
  },
  {
    id: 7,
    dest: "Darjeeling",
    type: "Adventure",
    date: "August 15-20, 2026",
    price: "₹16,000/person",
    spots: "2/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://wallpapercave.com/wp/wp6191685.jpg"
  },
  {
    id: 8,
    dest: "Ladakh",
    type: "Adventure",
    date: "September 1-10, 2026",
    price: "₹35,000/person",
    spots: "2/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://t3.ftcdn.net/jpg/02/64/31/46/360_F_264314658_bMWblZcsJj9XTTwkOo1l4Z3eOIx9T3Qv.jpg"
  },
  {
    id: 9,
    dest: "Jaipur",
    type: "Cultural",
    date: "September 15-20, 2026",
    price: "₹10,500/person",
    spots: "5/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://media.istockphoto.com/id/482557081/photo/hawa-mahal-jaipur-india.jpg?s=612x612&w=0&k=20&c=A6qCUjoNH74nXCkB07RNgK3eIt2mun8PgsLPw9dNkVI="
  },
  {
    id: 10,
    dest: "Udaipur",
    type: "Romantic",
    date: "October 2-7, 2026",
    price: "₹17,000/person",
    spots: "3/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://map.sahapedia.org/admin/assets/images/2021033013400727799_Banner.jpg?__imr__=bannerMuseum"
  },
  {
    id: 11,
    dest: "Agra",
    type: "Cultural",
    date: "October 15-18, 2026",
    price: "₹9,000/person",
    spots: "6/10 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80"
  },
  {
    id: 12,
    dest: "Varanasi",
    type: "Spiritual",
    date: "November 1-5, 2026",
    price: "₹8,500/person",
    spots: "5/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://tse2.mm.bing.net/th/id/OIP.4vczHYikRKBhf8YZrmZHpwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 13,
    dest: "Hampi",
    type: "Cultural",
    date: "November 15-20, 2026",
    price: "₹9,500/person",
    spots: "4/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://th.bing.com/th/id/R.2cdc497c83968a20809bc31b6656665f?rik=PYxuGetMHaVXMA&riu=http%3a%2f%2fwww.thehistoryhub.com%2fwp-content%2fuploads%2f2014%2f04%2fVirupaksha-Temple-of-Hampi.jpg&ehk=b0Dt0dOD8no1s7z5pLO9o5rRlZcGO6VmGRZR%2bcjGn5w%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 14,
    dest: "Rishikesh",
    type: "Spiritual",
    date: "December 1-6, 2026",
    price: "₹8,000/person",
    spots: "5/10 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://tse1.mm.bing.net/th/id/OIP.55boTMM8hcy4qEz7fAEb_gHaED?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 15,
    dest: "Coorg",
    type: "Adventure",
    date: "December 15-20, 2026",
    price: "₹14,500/person",
    spots: "3/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://t4.ftcdn.net/jpg/08/66/94/01/360_F_866940191_ud3TRZ47bmZQar43zlesyDNTDo5yNm81.jpg"
  },
  {
    id: 16,
    dest: "Gangtok",
    type: "Adventure",
    date: "January 5-10, 2027",
    price: "₹18,000/person",
    spots: "2/6 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://media.istockphoto.com/id/515792454/photo/buddha-park-ravangla.jpg?s=612x612&w=0&k=20&c=6R5vX7MAdFUdSIhH4zTbTxub2JEc6fak880ardwWNaE="
  },
  {
    id: 17,
    dest: "Delhi",
    type: "Cultural",
    date: "January 18-22, 2027",
    price: "₹7,500/person",
    spots: "6/10 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80"
  },
  {
    id: 18,
    dest: "Mumbai",
    type: "Cultural",
    date: "February 1-5, 2027",
    price: "₹9,500/person",
    spots: "5/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=200&q=80"
  },
  {
    id: 19,
    dest: "Chennai",
    type: "Cultural",
    date: "February 12-16, 2027",
    price: "₹8,500/person",
    spots: "4/8 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80"
  },
  {
    id: 20,
    dest: "Hyderabad",
    type: "Cultural",
    date: "March 1-5, 2027",
    price: "₹8,000/person",
    spots: "6/10 spots",
    via: "WhatsApp",
    color: "from-green-500 to-emerald-400",
    img: "https://tse1.mm.bing.net/th/id/OIP.7IrJMGZmyQZaalL-laIdNwHaE5?rs=1&pid=ImgDetMain&o=7&rm=3"
  }
];

const TYPE_COLORS = {
  Adventure: 'bg-teal-500/20 text-teal-400',
  Spiritual: 'bg-purple-500/20 text-purple-400',
  Romantic: 'bg-pink-500/20 text-pink-400',
}

export default function GroupTravel() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto w-fit"><Users className="w-3.5 h-3.5" /> Group Travel</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Group <span className="gradient-text">Travel</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">Don't travel alone! Join like-minded travelers heading to the same destination.</p>
        </div>

        {/* How it works */}
        <div className="card mb-10">
          <h3 className="font-display font-semibold text-white mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { n: '1', title: 'Pick a Trip', desc: 'Browse upcoming group trips or suggest your own destination' },
              { n: '2', title: 'Join the Group', desc: "Click join and we'll add you to a WhatsApp or Telegram group chat" },
              { n: '3', title: 'Travel Together', desc: 'Plan together, split costs, share experiences, and make lifelong friends' },
            ].map(({ n, title, desc }) => (
              <div key={n}>
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-400 font-display font-bold flex items-center justify-center mx-auto mb-3">{n}</div>
                <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-display font-semibold text-white text-xl mb-4">Upcoming Group Trips</h3>
        <div className="space-y-4">
          {GROUP_TRIPS.map(trip => (
            <div key={trip.id} className="card flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-teal-500/20 transition-all">
              <img src={trip.img} alt={trip.dest} className="w-full sm:w-16 h-40 sm:h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <h4 className="font-display font-bold text-white text-lg">{trip.dest}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[trip.type] || 'bg-slate-500/20 text-slate-400'}`}>{trip.type}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>📅 {trip.date}</span>
                  <span>₹ {trip.price}</span>
                  <span>👥 {trip.spots}</span>
                </div>
                {/* Progress bar */}
                <div className="mt-2 w-full max-w-xs h-1.5 bg-navy-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${trip.color} rounded-full`}
                    style={{ width: `${(parseInt(trip.spots) / parseInt(trip.spots.split('/')[1])) * 100}%` }}
                  />
                </div>
              </div>
              <button className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${trip.color} hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg`}>
                {trip.via === 'WhatsApp' ? '💬' : '✈️'} Join via {trip.via}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
