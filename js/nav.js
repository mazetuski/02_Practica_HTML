import {debounce} from "./utils.js";
import {smoothScroll} from "./utils.js";

export class Nav{

    constructor(){
        // Get all elements
        this.nav = document.querySelector('nav');
        this.buttonNav = document.querySelector('#navButton');
        this.buttonsNavIcon = document.querySelectorAll('#navButton i');
        this.navLinks = document.querySelectorAll('nav a[href^="#"]');
        this.sections = document.querySelectorAll("section");
        this.offsets = [];
    }

    initialize() {
        // initialize listeners and animatons
        this.buttonNav.addEventListener('click', this.toggleNav.bind(this));
        window.addEventListener('scroll', debounce(this.activeMenuOnScroll.bind(this)));
        this.prepareNavigation();
        this.animateNav();
    }

    /**
     * Method for toggle nav when click on hamburguer
     */
    toggleNav() {
        // Change nav button and show nav when click in it
        this.nav.classList.toggle('expanded-nav');
        this.buttonsNavIcon.forEach(item => item.classList.toggle('icon-hidden'));
        this.buttonsNavIcon.forEach(item => item.classList.toggle('icon-visible'));
    }

    /**
     * Smooth scroll on nav items
     */
    animateNav() {
        // Animate nav links click
        this.navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // EDGE partial support
                // document.querySelector(this.getAttribute('href')).scrollIntoView({
                //     behavior: 'smooth'
                // });

                smoothScroll(this.getAttribute('href'));
            });
        });
    }

    /**
     * Activation of menu items when users are in their sections
     */
    activeMenuOnScroll () {
        let pageOffset = window.pageYOffset;
        let idSelected;
        let lastValue = null;

        for(let key in this.offsets){
            // check if hasOwnProperty
            if(!this.offsets.hasOwnProperty(key)) continue;
            let value = this.offsets[key];
            // check if pageOffset is on this loop value
            if( value > pageOffset || (value < lastValue && lastValue !== null)) continue;
            // if all is good add new last value and select this section id
            lastValue = value;
            idSelected = key;
        }

        this.navLinks.forEach(
            (item) => item.classList.remove('active')
        );
        // check if we have a section selected
        if(!idSelected) return;
        document.querySelector(`a[href^='${idSelected}']`).classList.add('active');
    }

    prepareNavigation() {
        this.sections.forEach(
            (item) => {
                this.offsets['#'+item.id] = this.cumulativeOffset(item);
            }
        );
    }

    cumulativeOffset (element) {
        let top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    }
}