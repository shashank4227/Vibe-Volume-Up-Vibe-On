import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Play, Clock, Heart, Share2, ArrowLeft } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { albums } from '../data/albums';

const AlbumDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const foundAlbum = albums.find((a) => a.id === parseInt(id));
    if (foundAlbum) {
      setAlbum(foundAlbum);
    } else {
      navigate('/'); // Redirect if not found
    }
  }, [id, navigate]);

  // Handle auto-play from search
  useEffect(() => {
    if (album && searchParams.get('playSongId')) {
      const songId = parseInt(searchParams.get('playSongId'));
      const songToPlay = album.songs.find(s => s.id === songId);
      
      if (songToPlay) {
        // Prepare playlist with images
        const playlistWithImages = album.songs.map(s => ({ ...s, image: album.image }));
        const songWithImage = { ...songToPlay, image: album.image };
        const startIndex = album.songs.findIndex(s => s.id === songId);
        
        playSong(songWithImage, { playlist: playlistWithImages, startIndex });
      }
    }
  }, [album, searchParams]);

  if (!album) return <div className="p-10 text-white">Loading...</div>;

  const handlePlayAlbum = () => {
    if (album.songs.length > 0) {
      playSong(album.songs[0], { playlist: album.songs, startIndex: 0 });
    }
  };

  const handlePlaySong = (song, index) => {
    playSong(song, { playlist: album.songs, startIndex: index });
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white pb-24">
      {/* Header / Back Button */}
      <div className="p-4 md:p-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
      </div>

      {/* Album Info Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-4 md:px-8 py-4 items-center md:items-end text-center md:text-left">
        <div className="shrink-0">
          <img 
            src={album.image} 
            alt={album.title} 
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-2xl"
          />
        </div>
        
        <div className="flex flex-col gap-2 md:gap-4 items-center md:items-start">
          <span className="text-xs md:text-sm font-bold tracking-wider text-[#FF2DD1] uppercase">Album</span>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
            <span className="font-semibold text-white">{album.artist}</span>
            <span>•</span>
            <span>{album.year}</span>
            <span>•</span>
            <span>{album.songsCount} songs</span>
          </div>
          <p className="text-gray-400 max-w-xl text-xs md:text-sm leading-relaxed hidden md:block">
            {album.description}
          </p>
          
          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={handlePlayAlbum}
              className="px-6 py-2 md:px-8 md:py-3 bg-[#FF2DD1] hover:bg-[#FF2DD1]/10 border-2 border-transparent hover:border-[#FF2DD1] rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-[#FF2DD1]/30 text-sm md:text-base"
            >
              <Play size={18} fill="currentColor" />
              Play Now
            </button>
            <button className="p-2 md:p-3 border border-gray-600 rounded-full hover:bg-white/10 transition-colors">
              <Heart size={18} />
            </button>
            <button className="p-2 md:p-3 border border-gray-600 rounded-full hover:bg-white/10 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="px-4 md:px-8 py-8">
        <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto] gap-4 p-4 text-gray-400 border-b border-white/10 text-xs md:text-sm font-medium uppercase tracking-wider">
            <span className="w-8 text-center hidden md:block">#</span>
            <span>Title</span>
            <span className="hidden md:block">Artist</span>
            <span className="flex justify-end"><Clock size={16} /></span>
          </div>
          
          <div className="flex flex-col">
            {album.songs.map((originalSong, index) => {
              // Add album image to the song object for the player
              const songWithImage = { ...originalSong, image: album.image };
              const isCurrentSong = currentSong?.id === songWithImage.id;
              
              // We need a playlist where ALL songs have the image, for the queue to work correctly
              const playlistWithImages = album.songs.map(s => ({ ...s, image: album.image }));

              return (
                <div 
                  key={songWithImage.id} 
                  className={`group grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto_auto] gap-4 p-4 items-center hover:bg-white/10 transition-colors cursor-pointer ${isCurrentSong ? 'bg-white/10' : ''}`}
                  onClick={() => playSong(songWithImage, { playlist: playlistWithImages, startIndex: index })}
                >
                  <div className="w-8 text-center flex justify-center text-gray-400 hidden md:flex">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <Play size={16} className="hidden group-hover:block text-white" fill="currentColor" />
                  </div>
                  
                  <div className="flex flex-col min-w-0">
                    <span className={`font-semibold truncate ${isCurrentSong ? 'text-[#FF2DD1]' : 'text-white'}`}>
                      {songWithImage.title}
                    </span>
                    <span className="text-gray-500 text-xs md:hidden truncate">{songWithImage.artist}</span>
                  </div>
                  
                  <div className="hidden md:block text-gray-400 text-sm truncate">
                    {songWithImage.artist}
                  </div>
                  
                  <div className="text-right text-gray-400 text-sm font-variant-numeric">
                    {songWithImage.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
