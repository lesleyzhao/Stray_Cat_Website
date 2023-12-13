// JavaScript to highlight the search term and scroll to it in the page
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightText = urlParams.get('highlight');

    if (highlightText) {
        const decodedText = decodeURIComponent(highlightText);
        highlightSearchTerm(decodedText);
        scrollToFirstHighlight(decodedText);
    }
};

function highlightSearchTerm(text) {
    const bodyContent = document.body.innerHTML;
    const highlightedContent = bodyContent.replace(new RegExp(escapeRegExp(text), 'gi'), '<span class="highlight">$&</span>');
    document.body.innerHTML = highlightedContent;
}

function scrollToFirstHighlight(text) {
    const highlightedElements = document.querySelectorAll('.highlight');
    if (highlightedElements.length > 0) {
        highlightedElements[0].scrollIntoView();
    }
}

// Function to escape regular expression special characters in text
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function goBack() {
    window.history.back();
}

function goBack() {
    window.history.back();
}