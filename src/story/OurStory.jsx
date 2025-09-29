import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Heart, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './story.css';

/* Gallery Item */
const GalleryItem = ({ photo, index, likedByUser, toggleFavorite, openModal }) => (
  <div
    className="gallery-item"
    role="button"
    tabIndex={0}
    aria-label={`Foto ${index + 1}`}
    onClick={() => openModal(photo, index)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(photo, index);
      }
    }}
  >
    <img
      src={photo.src}
      alt={`Foto ${index + 1}`}
      className="gallery-image"
      loading="lazy"
      decoding="async"
    />
    <div className="gallery-overlay" aria-hidden="true">
      <button
        type="button"
        className="favorite-btn"
        aria-label={likedByUser.has(index) ? 'Quitar me gusta' : 'Dar me gusta'}
        onClick={(e) => toggleFavorite(index, e)}
      >
        <Heart
          size={20}
          fill={likedByUser.has(index) ? '#ff4757' : 'none'}
          color={likedByUser.has(index) ? '#ff4757' : '#fff'}
        />
      </button>
    </div>
  </div>
);

/* Comments */
const CommentList = ({ comments }) => (
  <div className="comments-list">
    {comments.map((comment, idx) => (
      <div key={idx} className="comment-item">
        <span className="comment-text">{comment.content}</span>
      </div>
    ))}
  </div>
);

const CommentForm = ({ newComment, setNewComment, handleSubmit }) => (
  <form className="comment-form" onSubmit={handleSubmit}>
    <input
      type="text"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="dejales algo lindo a los novios"
      className="comment-input"
    />
    <button type="submit" className="comment-submit">Publicar</button>
  </form>
);

/* Modal */
const Modal = ({
  modalImage,
  closeModal,
  navigateModal,
  currentIndex,
  likedByUser,
  toggleFavorite,
  downloadImage,
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
}) => (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="nav-btn prev-btn" onClick={() => navigateModal('prev')}>
        <ChevronLeft size={24} />
      </button>
      <button className="nav-btn next-btn" onClick={() => navigateModal('next')}>
        <ChevronRight size={24} />
      </button>
      <button className="close-btn" onClick={closeModal}>
        <X size={24} />
      </button>

      <Zoom>
        <img
          src={modalImage.src}
          alt="Imagen"
          className="modal-image"
          style={{ touchAction: 'none' }}
        />
      </Zoom>

      <div className="modal-info">
        <div className="modal-actions">
          <button
            className="action-btn"
            onClick={(e) => toggleFavorite(currentIndex, e)}
          >
            <Heart
              size={20}
              fill={likedByUser.has(currentIndex) ? '#ff4757' : 'none'}
              color={likedByUser.has(currentIndex) ? '#ff4757' : '#666'}
            />
            {likedByUser.has(currentIndex) ? 'Me gusta' : 'Like'}
          </button>
          <button
            className="action-btn"
            onClick={() => downloadImage(modalImage.src, 'foto')}
          >
            <Download size={20} color="#666" />
            Descargar
          </button>
        </div>

        <div className="comments-section">
          <CommentList comments={comments} />
          <CommentForm
            newComment={newComment}
            setNewComment={setNewComment}
            handleSubmit={handleCommentSubmit}
          />
        </div>
      </div>
    </div>
  </div>
);

/* Main Component */
export const OurStory = () => {
  const [sessionId, setSessionId] = useState(null);
  const [likesCount, setLikesCount] = useState({});
  const [likedByUser, setLikedByUser] = useState(new Set());
  const [modalImage, setModalImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const totalLikes = useMemo(
    () => Object.values(likesCount).reduce((sum, c) => sum + c, 0),
    [likesCount]
  );

  const photos = useMemo(
    () => [
      { src: '/img/1.jpg' },
      { src: '/img/2.jpg' },
      { src: '/img/3.jpg' },
      { src: '/img/4.jpg' },
      { src: '/img/5.jpg' },
      { src: '/img/6.jpg' },
     { src: '/img/7.jpg' },
    ],
    []
  );

  useEffect(() => {
    let storedId = localStorage.getItem('session_id');
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem('session_id', storedId);
    }
    setSessionId(storedId);
  }, []);

  useEffect(() => {
    if (sessionId) fetchLikes();
  }, [sessionId]);

  const fetchLikes = async () => {
    const { data, error } = await supabase.from('likes').select('photo_index, session_id');
    if (error) return console.error('Error fetching likes:', error);

    const counts = {};
    const userLiked = new Set();
    data.forEach(({ photo_index, session_id: liker }) => {
      counts[photo_index] = (counts[photo_index] || 0) + 1;
      if (liker === sessionId) userLiked.add(photo_index);
    });

    setLikesCount(counts);
    setLikedByUser(userLiked);
  };

  const toggleFavorite = async (index, e) => {
    e.stopPropagation();
    if (likedByUser.has(index)) return;

    const { error } = await supabase.from('likes').insert([
      { photo_index: index, session_id: sessionId },
    ]);
    if (error) return console.error('Error adding like:', error);

    setLikesCount((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    setLikedByUser((prev) => new Set(prev).add(index));
  };

  const openModal = async (photo, index) => {
    setModalImage(photo);
    setCurrentIndex(index);
    await fetchComments(index);
  };

  const fetchComments = async (index) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('photo_index', index)
      .order('created_at', { ascending: true });

    if (error) return console.error('Error fetching comments:', error);
    setComments(data);
  };

  const navigateModal = (direction) => {
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % photos.length
        : (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    setModalImage(photos[newIndex]);
    fetchComments(newIndex);
  };

  const downloadImage = (src, caption) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${caption}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase.from('comments').insert([
      { photo_index: currentIndex, session_id: sessionId, content: newComment.trim() },
    ]);
    if (error) return console.error('Error saving comment:', error);

    setComments([
      ...comments,
      {
        photo_index: currentIndex,
        session_id: sessionId,
        content: newComment.trim(),
        created_at: new Date().toISOString(),
      },
    ]);
    setNewComment('');
  };

  const closeModal = () => setModalImage(null);

  return (
    <div className="story-container">
      <div className="story-header">
        <h2 className="story-title">NOSOTROS...</h2>
      </div>

      <div className="story-gallery">
        {photos.map((photo, index) => (
          <GalleryItem
            key={index}
            photo={photo}
            index={index}
            likedByUser={likedByUser}
            toggleFavorite={toggleFavorite}
            openModal={openModal}
          />
        ))}
      </div>

      {modalImage && (
        <Modal
          modalImage={modalImage}
          closeModal={closeModal}
          navigateModal={navigateModal}
          currentIndex={currentIndex}
          likedByUser={likedByUser}
          toggleFavorite={toggleFavorite}
          downloadImage={downloadImage}
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCommentSubmit={handleCommentSubmit}
        />
      )}

      {totalLikes > 0 && (
        <div className="favorites-counter">❤️ {totalLikes} favoritos</div>
      )}
    </div>
  );
};
