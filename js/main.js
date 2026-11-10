'use strict';

function getMobileOperator(phoneString) {
    const digits = phoneString.replace(/\D/g, '');

    let operatorCode = '';
    if (digits.startsWith('380') && digits.length >= 5) {
        operatorCode = digits.slice(3, 5);
    } else if (digits.startsWith('0') && digits.length >= 3) {
        operatorCode = digits.slice(1, 3);
    }

    const operatorsByCode = {
        Kyivstar: ['67', '68', '96', '97', '98', '77'],
        Vodafone: ['50', '66', '95', '99', '75'],
        lifecell: ['63', '73', '93']
    };

    for (const [operator, codes] of Object.entries(operatorsByCode)) {
        if (codes.includes(operatorCode)) {
            return operator;
        }
    }

    return 'Невідомий оператор';
}


function calculateAge(dobString) {
    const match = dobString.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (!match) return null;

    const [, dayStr, monthStr, yearStr] = match;
    const birthDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function getYearWord(age) {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'років';
    }
    if (lastDigit === 1) {
        return 'рік';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'роки';
    }
    return 'років';
}

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
    
    // 4.1. Визначення мобільного оператора та обробка подій наведення
    const phoneEl = document.getElementById('userPhone');

    if (phoneEl) {
        const originalPhoneText = phoneEl.textContent.trim();
        const operatorName = getMobileOperator(originalPhoneText);

        phoneEl.addEventListener('mouseenter', () => {
            phoneEl.textContent = `${operatorName}: ${originalPhoneText}`;
        });

        phoneEl.addEventListener('mouseleave', () => {
            phoneEl.textContent = originalPhoneText;
        });
    }

    // 4.2. Обчислення віку користувача та запис в атрибут title
    const dobEl = document.getElementById('userDob');

    if (dobEl) {
        const age = calculateAge(dobEl.textContent);

        if (age !== null) {
            dobEl.setAttribute('title', `Вік: ${age} ${getYearWord(age)}`);
        }
    }
});