export const questions = [
    {
        text: "Which command is used to create a new Angular project?",
        options: [
            'npm create angular-app',
            'ng new project-name',
            'angular init project-name',
            'npm start angular'
        ],
        answer: 1,
    },
    {
        text: 'How do you bind data to an attribute in Angular?',
        options: ['{{variable}}',
            '(variable)',
            '[variable]',
            '=variable='],
        answer: 2,
    },
    {
        text: 'Which Angular decorator is used to listen to DOM events?',
        options: [
            '@Output()',
            '@Input()',
            ' @Event()',
            '@HostListener()',
        ],
        answer: 3,
    },
    {
        text: 'How can you fetch data from a server or database in Angular?',
        options: [
            'Using the HTTPModule',
            'Using the FetchAPI',
            'Using the ServerModule',
            'Using the DatabaseModule'
        ],
        answer: 0,
    },
    {
        text: 'What does a pipe do in Angular?',
        options: ['Connects two components',
            'Transforms data in the template',
            'Merges streams of data',
            'Opens a direct connection to the server'],
        answer: 1,
    },
    {
        text: 'In which lifecycle hook is it recommended to send HTTP requests in an Angular component?',
        options: [
            'constructor',
            'ngOnInit',
            'ngOnDestroy',
            'ngAfterViewInit'
        ],
        answer: 1,
    },
    {
        text: 'What purpose does the ngModel directive serve?',
        options: ['Handling HTTP requests',
            'Data binding for both input and output',
            'Listening to DOM events',
            'Controlling animation'],
        answer: 1,
    },
    {
        text: 'How can you generate a new service using Angular CLI?',
        options: [
            'ng create service my-service',
            'ng generate service my-service',
            'ng new service my-service',
            'ng add service my-service'
        ],
        answer: 1,
    },
    {
        text: 'What is the use of Angular Directives?',
        options: [' To inject services',
            'To initialize component state',
            'To manipulate the DOM elements',
            'To store data'],
        answer: 2,
    },
    {
        text: 'Which Angular decorator is used for making a class a root module?',
        options: ['@Module()',
            '@Component()',
            '@Directive()',
            '@NgModule()'],
        answer: 3,
    },
];