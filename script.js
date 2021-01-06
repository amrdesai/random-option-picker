// Variables
const tagsEl = document.getElementById('tags');
const textareaEl = document.getElementById('textarea');

// Set focus to textarea on page load
textareaEl.focus();

// Function: Create tags
const createTags = (input) => {
    const tags = input
        .split(',')
        .filter((tag) => tag.trim() !== '')
        .map((tag) => tag.trim());

    // Clear tagsEl
    tagsEl.innerHTML = '';
    // Update tagsEl with all tags
    tags.forEach((tag) => {
        // create a new span for tag
        const tagEl = document.createElement('span');
        // add 'tag' class
        tagEl.classList.add('tag');
        // update innter text
        tagEl.innerText = tag;
        // append to tagsEl
        tagsEl.appendChild(tagEl);
    });
};

// Function: Select random option
const randomSelect = () => {
    const times = 25;
    const interval = setInterval(() => {
        const randomTag = pickRandomTag();
        // highlight tag
        highlightTag(randomTag);
        // unhighlight tag
        setTimeout(() => {
            unHighlightTag(randomTag);
        }, 100);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
            const randomTag = pickRandomTag();
            highlightTag(randomTag);
        }, 100);
    }, times * 100);
};

// Function: Pick random tag
const pickRandomTag = () => {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
};

// Function: Add highlight class
const highlightTag = (tag) => {
    tag.classList.add('highlight');
};

// Function: Remove highlight class
const unHighlightTag = (tag) => {
    tag.classList.remove('highlight');
};

// Event Listener: To update tags in UI
textareaEl.addEventListener('keyup', (e) => {
    createTags(e.target.value);

    // Check if user pressed enter
    if (e.key === 'Enter' && textareaEl.value !== '') {
        setTimeout(() => {
            e.target.value = '';
        }, 10);
        // Select random option
        randomSelect();
    }
});
