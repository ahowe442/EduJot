const express = require('express');
const port = 5002;
const app = express();

const ideas = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tag: 'Walkthrough',
    observeeOrStudent: 'Maria Montessori',
    date: '2024-22-03',
    user: 'Abby Howe',
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tag: '504 Meeting Notes',
    observeeOrStudent: 'Little Johnny',
    date: '2024-20-03',
    user: 'Abby Howe',
  },
  {
    id: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tag: 'Bldg Leadership Meeting Notes',
    observeeOrStudent: null,
    date: '2024-20-03',
    user: 'Abby Howe',
  },
];

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the EduJot App.' });
});

// Get all ideas.
app.get('/api/ideas', (req, res) => {
  res.json({ success: true, data: ideas });
});

// Get an idea by id
app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find(
    (idea) => idea.id === +req.params.id
  );

  if (!idea) {
    return res.status(404).json({
      success: false,
      error: 'Resource not found',
    });
  }

  res.json({ success: true, data: idea });
});

// Get an idea by keyword
app.get('/api/ideas/:keyword', (req, res) => {
  const keyword = req.params.keyword.toLowerCase(); // Convert keyword to lowercase for case-insensitive comparison
  const idea = ideas.find((idea) =>
    idea.keywords.includes(keyword)
  );

  if (!idea) {
    return res
      .status(404)
      .json({
        success: false,
        error: 'Resource not found',
      });
  }

  res.json({ success: true, data: idea });
});

// Get ideas by search term
app.get('/api/ideas/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm.toLowerCase(); // Convert searchTerm to lowercase for case-insensitive comparison
  const matchingIds = [];

  ideas.forEach((idea) => {
    // Check if any of the keys contain the searchTerm
    if (
      idea.text.toLowerCase().includes(searchTerm) ||
      idea.tag.toLowerCase().includes(searchTerm) ||
      idea.observeeOrStudent
        .toLowerCase()
        .includes(searchTerm) ||
      idea.user.toLowerCase().includes(searchTerm)
    ) {
      matchingIds.push(idea.id); // Add the ID of the idea to the matchingIds array
    }
  });

  if (matchingIds.length === 0) {
    return res
      .status(404)
      .json({
        success: false,
        error: 'No matching ideas found',
      });
  }

  res.json({ success: true, matchingIds: matchingIds });
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
