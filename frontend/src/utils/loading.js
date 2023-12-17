const startLoading = () => {
    const loader = document.querySelector('#loader');
    loader.classList.remove('d-none');
}

const stopLoading = () => {
    const loader = document.querySelector('#loader');
    loader.classList.add('d-none');
}

export default {startLoading, stopLoading};