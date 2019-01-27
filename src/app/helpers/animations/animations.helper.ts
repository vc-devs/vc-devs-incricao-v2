import { trigger, animate, style, group, query, stagger, transition, keyframes } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
      /* order */
      /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
            , { optional: true }),
    /* 2 */ query('.block', style({ opacity: 0 }), { optional: true }),
      /* 3 */ group([  // block executes in parallel
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
            ], { optional: true }),
        ]),
      /* 4 */ query(':enter .block', stagger(400, [
            style({ transform: 'translateY(100px)' }),
            animate('1s ease-in-out',
                style({ transform: 'translateY(0px)', opacity: 1 })),
        ]), { optional: true }),
    ])
]);


export const listObjShow = trigger('listObjShow', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('150ms', [
            animate('600ms', keyframes([
                style({ opacity: 0, transform: 'translateX(-200px)'}),
                style({ opacity: .3, transform: 'translateX(-100px)'}),
                style({ opacity: 1, transform: 'translateX(0)'}),

            ]))

        ]), { optional: true }),

        query(':leave', stagger('150ms', [
            animate('600ms', keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: .5, transform: 'translateX(-100px)', offset: 0.3 }),
                style({ opacity: 0, transform: 'translateX(-200px)', offset: 1 }),

            ]))
        ]), { optional: true }),
    ])
]);
