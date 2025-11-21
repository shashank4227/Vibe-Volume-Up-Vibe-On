import React, { useState } from 'react'
import { Play, Pause, Heart, Share2, Clock, Music, Plus, Trash2, Edit3 } from 'lucide-react'

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists')
  const [isPlaying, setIsPlaying] = useState(null)

  const playlists = [
    {
      id: 1,
      name: "My Favorites",
      description: "Songs I love the most",
      songCount: 24,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      lastPlayed: "2 hours ago"
    },
    {
      id: 2,
      name: "Workout Mix",
      description: "High energy tracks for the gym",
      songCount: 18,
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center",
      lastPlayed: "1 day ago"
    },
    {
      id: 3,
      name: "Chill Vibes",
      description: "Relaxing music for downtime",
      songCount: 32,
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
      lastPlayed: "3 days ago"
    }
  ]

  const recentSongs = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Waves",
      album: "Night Vibes",
      duration: "3:45",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      playedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "Neon Beats",
      album: "Digital Revolution",
      duration: "4:12",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center",
      playedAt: "5 hours ago"
    },
    {
      id: 3,
      title: "Ocean Breeze",
      artist: "Coastal Vibes",
      album: "Summer Sessions",
      duration: "3:28",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
      playedAt: "1 day ago"
    }
  ]

  const likedSongs = [
    {
      id: 1,
      title: "City Lights",
      artist: "Urban Symphony",
      album: "Metropolitan",
      duration: "4:33",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Mountain High",
      artist: "Peak Performers",
      album: "Nature's Call",
      duration: "5:15",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center"
    }
  ]

  const tabs = [
    { id: 'playlists', label: 'Playlists', count: playlists.length },
    { id: 'recent', label: 'Recently Played', count: recentSongs.length },
    { id: 'liked', label: 'Liked Songs', count: likedSongs.length }
  ]

  const getCurrentSongs = () => {
    switch (activeTab) {
      case 'playlists':
        return playlists
      case 'recent':
        return recentSongs
      case 'liked':
        return likedSongs
      default:
        return []
    }
  }

  const handlePlay = (songId) => {
    setIsPlaying(isPlaying === songId ? null : songId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Library</h1>
        <p className="text-gray-600">Manage your playlists, view listening history, and organize your music</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'playlists' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Playlists</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Playlist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="card hover:shadow-xl transition-all duration-300 group">
                <div className="relative mb-4">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-6 h-6 text-primary-600 ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{playlist.name}</h3>
                  <p className="text-gray-600 text-sm">{playlist.description}</p>
                  <p className="text-gray-500 text-xs">{playlist.songCount} songs • {playlist.lastPlayed}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit3 className="w-4 h-4 text-gray-500 hover:text-primary-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'recent' || activeTab === 'liked') && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {activeTab === 'recent' ? 'Recently Played' : 'Liked Songs'}
          </h2>

          <div className="space-y-4">
            {getCurrentSongs().map((song) => (
              <div key={song.id} className="card hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handlePlay(song.id)}
                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg flex items-center justify-center transition-all duration-300"
                    >
                      {isPlaying === song.id ? (
                        <Pause className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                      ) : (
                        <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 ml-1" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{song.title}</h3>
                    <p className="text-gray-600 text-sm">{song.artist}</p>
                    <p className="text-gray-500 text-xs">{song.album}</p>
                    {song.playedAt && (
                      <p className="text-gray-400 text-xs mt-1">{song.playedAt}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500 text-sm flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{song.duration}</span>
                    </span>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Heart className="w-4 h-4 text-gray-500 hover:text-red-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Share2 className="w-4 h-4 text-gray-500 hover:text-primary-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Library
