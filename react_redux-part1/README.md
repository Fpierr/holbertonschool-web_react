# React Redux

This project aims to migrate a React application to Redux in order to centralize the application's state management.


## Main Objectif
Transform a React application that uses props and local state into an application that uses Redux Toolkit as the single source of truth for managing global state.

## Resources
##### Read or watch:

- [Redux](https://redux.js.org/introduction/getting-started)
- [Create Slice](https://redux-toolkit.js.org/api/createSlice)
- [Extra reducers](https://medium.com/@mindsurfingclub/redux-toolkit-extra-reducer-explained-createasyncthunk-1480c54e8b58)
- [[Root reducer](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#combinereducers)
- Mock Axios](https://github.com/knee-cola/jest-mock-axios#readme)

## Learning Objectives
- Why Redux is Awesome
- How to manage state through redux slices
- What Happens When You Dispatch an Action in Redux
- What is a Redux Store
- How to Access State using useSelector
- How to dispatch actions using useDispatch

## Requirements
- All your files will be interpreted/compiled on Ubuntu 20.04 LTS using `node 20.x.x` and `npm 10.x.x`
- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- All your files should end with a new line
- A `README.md` file, at the root of the project’s folder and each task’s folder, is mandatory
- Install Jest globally: `npm install -g jest`


## Main folders:

- **app/**: Redux store configuration and root reducer
- **features/**: Redux slices (auth, notifications, courses)
- **components/**: Reusable components (Header, Footer, Notifications, etc.)
- **pages/**: Application pages (CourseList, Login)
- **hooks/**: Custom hooks
- **utils/**: Utility functions
- **assets/**: Containing images and logo
- **tests/**: Test app



## Author
[Fanuel PIERRE](https://gitbub.com/fpierr)