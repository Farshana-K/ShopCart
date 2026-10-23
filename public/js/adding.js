
document.addEventListener("DOMContentLoaded", () => {
    const sizeInputs = document.querySelectorAll("input[name='size']");
    const colorInputs = document.querySelectorAll("input[name='color']");
    const cartBtn = document.getElementById("cartBtn");
    const wishlistBtn = document.getElementById("wishlistBtn");

    let selectedSize = null;
    let selectedColor = null;

    function checkSelection() {
        if (selectedSize && selectedColor) {
            cartBtn.disabled = false;
            wishlistBtn.disabled = false;
        } else {
            cartBtn.disabled = true;
            wishlistBtn.disabled = true;
        }
    }

    sizeInputs.forEach(input => {
        input.addEventListener("change", () => {
            selectedSize = input.value;
            checkSelection();
        });
    });

    colorInputs.forEach(input => {
        input.addEventListener("change", () => {
            selectedColor = input.value;
            checkSelection();
        });
    });

    // Example: Sending data when button is clicked
    const productId = document.body.dataset.productId;
    

cartBtn.addEventListener('click', async () => {
    if (!selectedSize || !selectedColor) return;

    try {
        const response = await fetch('/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                size: selectedSize,
                color: selectedColor
            })
        });

        console.log('Response status:', response.status);
        console.log('Response URL:', response.url);
        console.log('Content type:', response.headers.get('content-type'));

        const data = await response.json();

        console.log('Response data:', data);

        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
            return;
        }

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: data.success ? 'success' : 'warning',
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    } catch (error) {
        console.error('Add to cart error:', error);

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please check the browser console for details.'
        });
    }
});


wishlistBtn.addEventListener('click', async () => {
    if (!selectedSize || !selectedColor) return;

    try {
        const response = await fetch('/addToWishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                size: selectedSize,
                color: selectedColor
            })
        });

        const data = await response.json();

        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
            return;
        }

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: data.success ? 'success' : 'warning',
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    } catch (error) {
        console.error('Add to wishlist error:', error);

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again.'
        });
    }
});

});

