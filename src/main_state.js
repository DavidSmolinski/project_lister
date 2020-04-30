// state for the main component in index.js
export let main_state = {
  skills: [
    {
      // 0
      name: 'skill 0',
      on: false
    },
    {
      // 1
      name: 'skill 1',
      on: false
    },
    {
      // 2
      name: 'skill 2',
      on: false
    },
    {
      // 3
      name: 'skill 3',
      on: false
    },
    {
      // 4
      name: 'skill 4',
      on: false
    },
    {
      // 5
      name: 'skill 5',
      on: false
    },
  ],
  projects: [
    {
      // 0
      name: 'project 0',
      url: 'blank',
    },
    {
      // 1
      name: 'project 1',
      url: 'blank',
    },
    {
      // 2
      name: 'project 2',
      url: 'blank',
    },
    {
      // 3
      name: 'project 3',
      url: 'blank',
    }
  ],
  // Row index is skill number.
  // Col index is project number.
  skills_projects: [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0],
  ],
};