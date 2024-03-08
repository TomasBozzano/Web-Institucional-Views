class Loader {
    constructor(loaderId) {
        this.loader = document.getElementById(loaderId);
    }

    show() {
        this.loader.classList.remove('hidden');
    }

    hide() {
        this.loader.classList.add('hidden');
    }
}