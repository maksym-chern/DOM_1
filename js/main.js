'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Пункт 2: Логіка кнопки «Підписатися»
    const followBtn = document.getElementById('followBtn');

    if (followBtn) {
        followBtn.addEventListener('click', () => {
            const isSubscribed = followBtn.classList.toggle('btn--subscribed');
            followBtn.textContent = isSubscribed ? 'Ви підписані' : 'Підписатися';
            followBtn.setAttribute('aria-pressed', String(isSubscribed));
        });
    }

    // Пункт 3: Логіка кнопки «Вподобання»
    const likeBtn = document.getElementById('likeBtn');

    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            const isLiked = likeBtn.classList.toggle('user-card__like-btn--liked');
            likeBtn.setAttribute('aria-pressed', String(isLiked));
        });
    }
});