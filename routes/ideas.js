const express = require('express');
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tag: 'Walkthrough',
    person: 'Maria Montessori',
    date: '2024-22-03',
    user: 'Abby Howe',
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tag: '504 Meeting Notes',
    person: 'Little Johnny',
    date: '2024-20-03',
    user: 'Abby Howe',
  },
  {
    id: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tag: 'Bldg Leadership Meeting Notes',
    person: null,
    date: '2024-20-03',
    user: 'Abby Howe',
  },
];

// Get all ideas.
router.get('/', (req, res) => {
  res.json({ success: true, data: ideas });
});

// Get an idea by id
router.get('/:id', (req, res) => {
  const idea = ideas.find(
    (idea) => idea.id === +req.params.id
  );
  // if not found return a 404 error
  if (!idea) {
    return res.status(404).json({
      success: false,
      error: 'Resource not found',
    });
  }
  // share success message and return the idea
  res.json({ success: true, data: idea });
});

// Update idea
router.put('/:id', (req, res) => {
  const idea = ideas.find(
    (idea) => idea.id === +req.params.id
  );
  if (!idea) {
    res.status(404).json({
      success: false,
      error: 'Resource not found',
    });
  }
  //update or keep the original body, tag and person.
  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;
  idea.person = req.body.person || idea.person;

  res.json({ success: true, data: idea });
});

module.exports = router;
