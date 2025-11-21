import React, { useState } from 'react'
import { Search, Filter, Play, Heart, Share2, Clock, Music } from 'lucide-react'

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')

  const genres = ['All', 'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B']

  const songs = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Waves",
      album: "Night Vibes",
      genre: "Electronic",
      duration: "3:45",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      playCount: 125000
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "Neon Beats",
      album: "Digital Revolution",
      genre: "Electronic",
      duration: "4:12",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center",
      playCount: 89000
    },
    {
      id: 3,
      title: "Ocean Breeze",
      artist: "Coastal Vibes",
      album: "Summer Sessions",
      genre: "Pop",
      duration: "3:28",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
      playCount: 156000
    },
    {
      id: 4,
      title: "City Lights",
      artist: "Urban Symphony",
      album: "Metropolitan",
      genre: "Hip Hop",
      duration: "4:33",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=center",
      playCount: 203000
    },
    {
      id: 5,
      title: "Mountain High",
      artist: "Peak Performers",
      album: "Nature's Call",
      genre: "Rock",
      duration: "5:15",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center",
      playCount: 78000
    },
    {
      id: 6,
      title: "Jazz Fusion",
      artist: "Smooth Operators",
      album: "Urban Jazz",
      genre: "Jazz",
      duration: "6:22",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      playCount: 45000
    }
  ]

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.album.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const formatPlayCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Music</h1>
        <p className="text-gray-600">Discover new songs, artists, and genres from around the world</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Genre Filters */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedGenre === genre
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredSongs.length} {filteredSongs.length === 1 ? 'Song' : 'Songs'} Found
          </h2>
          <div className="flex items-center space-x-2 text-gray-500">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Sort by: Popularity</span>
          </div>
        </div>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSongs.map((song) => (
          <div key={song.id} className="card hover:shadow-xl transition-all duration-300 group">
            <div className="relative mb-4">
              <img
                src={song.cover}
                alt={song.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-6 h-6 text-primary-600 ml-1" />
                </button>
              </div>
              <div className="absolute top-2 right-2">
                <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                  {song.genre}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 truncate">{song.title}</h3>
              <p className="text-gray-600 text-sm">{song.artist}</p>
              <p className="text-gray-500 text-xs">{song.album}</p>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{song.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Music className="w-3 h-3" />
                    <span>{formatPlayCount(song.playCount)} plays</span>
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Heart className="w-4 h-4 text-gray-500 hover:text-red-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Share2 className="w-4 h-4 text-gray-500 hover:text-primary-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredSongs.length === 0 && (
        <div className="text-center py-12">
          <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No songs found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default Explore
