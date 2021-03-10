export {};

window.addEventListener("load", () => {
    setTimeout(() => scrollTop(), 500);
    loadPage();
});

window.addEventListener('resize', () => {
    setupFullScreen();
});

const loadPage = () => {
    setupFullScreen();
    setupContactButton();
    setupMainImageAnimation();
};

const setupMainImageAnimation = () => {

    const trackScrolling = () => {

        const mainImage     : HTMLElement  = document.getElementsByClassName("mainimage")[0] as HTMLElement;
        const imageAnimated : HTMLElement  = document.getElementsByClassName("image-animated")[0] as HTMLElement;
        const features      : HTMLElement  = document.getElementsByClassName("features")[0] as HTMLElement;
        // const pricing       : HTMLElement  = document.getElementsByClassName("pricing")[0] as HTMLElement;

        const isAboveFirstAnimationTilt     = window.scrollY < 200;
        const isBelowFirstAnimationTilt     = window.scrollY >= 200;
        const isBelowSecondAnimationDarker  = window.scrollY >= 600;
        const isBelowThirdAnimationFeatures = document.getElementsByClassName("features")[0].getBoundingClientRect().top <= window.innerHeight;

        //Initial Step
        if(isAboveFirstAnimationTilt) {
            mainImage.style.zIndex = "auto";
            mainImage.style.opacity = "1";
            imageAnimated.style.opacity = "0";
            mainImage.getElementsByTagName("img")[0].classList.remove("tilt");
            imageAnimated.getElementsByTagName("img")[0].classList.remove("tilt");
        }

        //Tilt Background
        if(isBelowFirstAnimationTilt && !isBelowThirdAnimationFeatures){
            if(!isIOS() && !isSafari) {
                mainImage.getElementsByTagName("img")[0].classList.add("tilt");
                imageAnimated.getElementsByTagName("img")[0].classList.add("tilt");
            }
        }

        //Show darker background
            if(isBelowSecondAnimationDarker){
            imageAnimated.style.opacity = "1";
            if(mainImage.style.opacity !== "0") setTimeout(() => mainImage.style.opacity = "0", 200);
        }

        //Features started to appear on the screen
        if(isBelowThirdAnimationFeatures){
            
            imageAnimated.getElementsByTagName("img")[0].classList.remove("tilt");
            mainImage.getElementsByTagName("img")[0].classList.remove("tilt");
            
            features.style.opacity = "1";
            // pricing.style.opacity = "1";

            mainImage.style.zIndex = "-1";

        }

        //Features are not visible on display
        if(!isBelowThirdAnimationFeatures) {
            features.style.opacity = "0";
            // pricing.style.opacity = "0";
            mainImage.style.zIndex = "auto";
        }

    }

    document.addEventListener('scroll', trackScrolling);
    document.addEventListener("wheel", trackScrolling);

}

const isIOS = () => {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) return true;
    return  navigator.maxTouchPoints        &&
            navigator.maxTouchPoints > 1    &&
            /MacIntel/.test(navigator.platform);
};

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const getPosition = (element: HTMLElement | null) => {
    var xPosition = 0;
    var yPosition = 0;
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent as HTMLElement;
    }
    return { x: xPosition, y: yPosition };
};

const setupContactButton = () => {
    Array.from(document.getElementsByClassName("btn-contact") as HTMLCollectionOf<HTMLElement>).map(btn => {
        const originalContent = btn.innerHTML;
        btn.onmouseover = () => {
            btn.innerHTML = "contact@tapioca.dog";
        }
        btn.onmouseout = () => {
            btn.innerHTML = originalContent;
        }
        btn.onclick = () => {
            window.location.href = "mailto:contact@tapioca.dog";
        }
        return null;
    });
};

const setupFullScreen = () => {

    //Background in fullscreen
    (() => {
        (document.getElementsByClassName("header")[0] as HTMLElement).style.height = window.innerHeight + "px";
    })();
    
    //Positioning of images
    (() => {

        const dynamicHeight = window.innerHeight * 0.9;

        (document.querySelector(".mainimage img") as HTMLElement).style.height                  =  dynamicHeight + "px";
        (document.querySelector(".image-animated") as HTMLElement).style.height                 =  dynamicHeight + "px";
        (document.querySelector(".image-animated img.background") as HTMLElement).style.height  = (dynamicHeight + 1) + "px";

        const stickyTopDistance = isIOS() ? 0.05 : 0.02;

        (document.querySelector(".mainimage") as HTMLElement).style.top         =   window.innerHeight * stickyTopDistance + "px";
        (document.querySelector(".image-animated") as HTMLElement).style.top    =   window.innerHeight * stickyTopDistance + "px";

        (document.getElementsByClassName("image-animated")[0] as HTMLElement).style.marginTop = (-1 * dynamicHeight) + "px";

    })();
    
    //Margin top adjustments - mainImage
    (() => {
        const mainImage: HTMLElement = document.getElementsByClassName("mainimage")[0] as HTMLElement;
        const percentageUp = (window.innerHeight/100)*11;
        const marginTopImage = -1 * ((window.innerHeight - getPosition(document.querySelectorAll(".free-disclaimer")[0] as HTMLElement).y) - percentageUp);
        mainImage.style.marginTop = marginTopImage + "px";
    })();

    //Features & Pricing - hiding
    (() => {
        (document.querySelectorAll(".features")[0] as HTMLElement).style.opacity    = "0";
        // (document.querySelectorAll(".pricing")[0] as HTMLElement).style.opacity     = "0";
    })();

    //Animated Image
    (() => {
        const imageAnimated: HTMLElement = document.getElementsByClassName("image-animated")[0] as HTMLElement;
        const features: HTMLElement      = document.getElementsByClassName("features")[0] as HTMLElement;

        //Landscape v Portrait
        const distanceFromFeatures = window.innerWidth <= 768 ? 0.2 : 0.55;

        const dynamicMarginBottom = (document.body.scrollHeight - getPosition(features).y + (features.getElementsByClassName("row")[0] as HTMLElement).offsetHeight * distanceFromFeatures);
        imageAnimated.style.marginBottom = dynamicMarginBottom + "px";

        features.style.marginTop = (dynamicMarginBottom * 0.7 * -1) + "px";
    })();

};

const scrollTop = () => {
    if(window.scrollY !== 0){
        document.addEventListener('scroll', scrollTopTracker);
        setTimeout(() => window.scrollTo(0, 0), 500);
        return true;
    }
    return false;
};

const scrollTopTracker = () => {
    if(window.scrollY !== 0) return;
    document.removeEventListener('scroll', scrollTopTracker);
};