// pages/index.js
import { useState } from 'react'; // useState'i içe aktar
import Game from '../components/Game'; // Game bileşenini içe aktar
import SecondGame from '../components/secondgame'; // İkinci oyunun bileşenini içe aktar
import styles from '../styles/home.module.css'; // CSS modülünü içe aktar

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false); // İlk oyunun durumu
  const [gameWon, setGameWon] = useState(false); // Oyunun kazanılıp kazanılmadığını kontrol etmek için
  const [showSecondGame, setShowSecondGame] = useState(false); // İkinci oyunun gösterilip gösterilmeyeceği

  const handleStartGame = () => {
    setGameStarted(true); // İlk oyunu başlat
    setGameWon(false); // Oyunu sıfırla
    setShowSecondGame(false); // İkinci oyunu gizle
  };

  const handleWinGame = () => {
    console.log('Oyun kazanıldı!');
    setGameWon(true); // Kazanma durumunu true yap
    setShowSecondGame(true); // İkinci oyunu göster
    setGameStarted(false); // Birinci oyunu kapat
  };

  return (
    <div className={styles.gameContainer}>
      <h1>IZTECH DLE GAME</h1>
      <button 
        className={styles.button} 
        onClick={handleStartGame}
        
      >
        Departman Tahmin Oyunu
      </button>
      <button 
        className={styles.button} 
        disabled={!gameWon} // Kazanmadıysa devre dışı
        style={{ 
          backgroundColor: gameWon ? '9B0E1F' : '#6c757d', // Kazanıldığında mavi, aksi takdirde gri
          color: '#fff' // Yazı rengi beyaz olsun
        }}
        onClick={() => setShowSecondGame(true)} // Kazanıldıysa ikinci oyunu göster
      >
        İkinci Oyun
      </button>
    
      
      {/* İlk oyun başlatıldığında Game bileşeni render edilsin */}
      {gameStarted && !showSecondGame && <Game onWin={handleWinGame} />} 

      {/* Eğer birinci oyun kazanıldıysa ve showSecondGame true ise ikinci oyun gösterilsin */}
      {showSecondGame && <SecondGame />}
    </div>
  );
}
