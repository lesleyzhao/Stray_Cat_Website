<!DOCTYPE html>
<html>

<head>
    <title>Search Result</title>
    <link rel='stylesheet' href='search.css'>
</head>

<body>

<?php

$files = ['fact.html', 'donate.html', 'action.html', 'stories.html'];

$query = $_GET['query'] ?? '';
$results = [];


function searchFile($fileName, $query) {
    $dom = new DOMDocument();
    @$dom->loadHTML(file_get_contents($fileName)); 

    $xpath = new DOMXPath($dom);
    $nodes = $xpath->query('//text()'); 

    $foundLines = [];

    foreach ($nodes as $node) {
        if (stripos($node->nodeValue, $query) !== false) { 
            
            $position = stripos($node->nodeValue, $query);
            $snippetLength = 100; 
            $start = max(0, $position - ($snippetLength / 2));
            $snippet = substr($node->nodeValue, $start, $snippetLength);

            $encodedSnippet = urlencode($snippet);

            $foundLines[] = '<a href="' . $fileName . '?highlight=' . $encodedSnippet . '">' . htmlspecialchars($snippet) . '...</a>';
        }
    }

    return $foundLines;
}


foreach ($files as $file) {
    $fileResults = searchFile($file, $query);
    $results = array_merge($results, $fileResults);
}

echo '<h2>Search Results for "' . htmlspecialchars($query) . '"</h2>';
echo '<ul>';
foreach ($results as $result) {
    echo '<li>' . $result . '</li>';
}
echo '</ul>';
?>

<button onclick="goBack()" id="closeButton">Close</button>

<script src="js/search.js"></script>

</body>

</html>