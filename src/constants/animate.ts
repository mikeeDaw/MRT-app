const transition = {type:"spring", bounce:0.25}

// Side Tabs
export const fadeIntoTab = {
    initial: {
        x: -40,
        y: 20,
        opacity: 0,
        transition: {...transition,duration:1, delay: 0.5}
    },
    animate: {
        x: 0,
        y: 20,
        opacity: 1,
        transition: {...transition,duration:1, delay: 0}
    },
    exit: {
        x: -40,
        y: 20,
        opacity: 0,
        transition: {...transition, duration:1, delay: 0}
    }
}
export const fadeIntoTabArrow = {
    initial : {
        rotate: 45,
        opacity: 0,
        y: -9,
        x:-30
    },
    animate: {
        rotate: [225, 45],
        opacity: 1,
        x: 0,
        transition: {...transition, delay: 0}
    },
    exit: {
        rotate: 45,
        opacity: 0,
        x: -40,
        transition: {...transition,duration:1, delay: 0}
    }
}

// Add Station Page
export const introPage = {
    initial: {
        x: 60,
        y: 0,
        opacity: 0,
        transition : {...transition, duration: 0.5, delay:0}
    },
    animate: {
        x: 0,
        y: 0,
        opacity: 1,
        transition : {...transition, duration: 0.5, delay:0}
    },
    exit: {
        x: 60,
        opacity: 0,
        transition : {...transition, duration: 0.5, delay:0}
    }
}
export const MapIntro = {
    initial : {
        opacity: 0,
        transition: {}
    }
}

// Cards Animation
export const cardList = {
    initial: {
        x: -50,
        y: 0,
        opacity: 0,
        transition: {...transition, duration:0.5, delay: 0}
    },
    animate: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {...transition, duration:0.5, delay: 0}
    }
}

export const cardData = {
    intial: {
        x: -50,
        opacity: 0,
        transition: {...transition, duration: 0.5, delay: 0}
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {...transition, duration: 0.5, delay: 0}
    },
    exit: {
        x: -50,
        opacity: 0,
        transition: {...transition, duration: 0.5, delay: 0}
    }
}