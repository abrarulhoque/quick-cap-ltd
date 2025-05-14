/**
 * QuickCap Ltd - Custom JavaScript
 * Handles animations, interactions and UI functionality
 */

document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect with smoother transition
  const navbar = document.querySelector('.navbar')
  let lastScrollTop = 0

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY

    // Add scrolled class with threshold
    if (scrollTop > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }

    // Hide/show navbar on scroll direction change with a slight delay
    if (scrollTop > 150) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)'
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)'
      }
    } else {
      navbar.style.transform = 'translateY(0)' // Always show at top of page
    }

    lastScrollTop = scrollTop
  })

  // Testimonial slider with improved animations
  const testimonialSlides = document.querySelectorAll('.testimonial-slide')
  const dots = document.querySelectorAll('.dot')
  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')
  let currentSlide = 0
  let isAnimating = false

  function showSlide (index, direction = 1) {
    if (isAnimating) return
    isAnimating = true

    // Hide all slides
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active')
      slide.style.transform =
        direction > 0 ? 'translateX(50px)' : 'translateX(-50px)'
      slide.style.opacity = '0'
    })

    // Deactivate all dots
    dots.forEach(dot => {
      dot.classList.remove('active')
    })

    // Show the current slide and activate the corresponding dot
    testimonialSlides[index].classList.add('active')
    testimonialSlides[index].style.transform = 'translateX(0)'
    testimonialSlides[index].style.opacity = '1'
    dots[index].classList.add('active')

    // Reset animation lock after transition completes
    setTimeout(() => {
      isAnimating = false
    }, 600)
  }

  // Next slide function with direction
  function nextSlide () {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide, 1)
  }

  // Previous slide function with direction
  function prevSlide () {
    currentSlide =
      (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
    showSlide(currentSlide, -1)
  }

  // Event listeners for next and previous buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide)
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide)
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (currentSlide === index) return
      const direction = index > currentSlide ? 1 : -1
      currentSlide = index
      showSlide(currentSlide, direction)
    })
  })

  // Auto-advance slides every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000)

  // Pause auto-advance when hovering over the slider
  const testimonialSlider = document.querySelector('.testimonial-slider')
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval)
    })

    testimonialSlider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000)
    })
  }

  // Smooth scrolling for anchor links with easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      if (targetId === '#') return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const offsetTop =
          targetElement.getBoundingClientRect().top + window.pageYOffset

        window.scrollTo({
          top: offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        })
      }
    })
  })

  // Mobile menu toggle behavior with improved UX
  const navbarToggler = document.querySelector('.navbar-toggler')
  const navbarCollapse = document.querySelector('.navbar-collapse')
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link')

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      const isClickInsideNavbar =
        navbarToggler.contains(event.target) ||
        navbarCollapse.contains(event.target)

      if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
        // Close the navbar if clicking outside
        navbarToggler.click()
      }
    })

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click()
        }
      })
    })
  }

  // Enhanced animations for elements when they enter the viewport
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.animate-on-scroll')

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate__fadeInUp')
        element.classList.add('animated')
        element.style.opacity = 1
      }
    })

    // Parallax effect for sections with parallax class
    document.querySelectorAll('.parallax').forEach(element => {
      const scrollPosition = window.pageYOffset
      const elementTop = element.getBoundingClientRect().top + scrollPosition
      const offset = (scrollPosition - elementTop) * 0.2

      if (element.classList.contains('parallax-bg')) {
        element.style.backgroundPositionY = `${offset}px`
      } else {
        element.style.transform = `translateY(${offset}px)`
      }
    })
  }

  // Initialize animation on scroll
  window.addEventListener('scroll', animateOnScroll)
  animateOnScroll() // Run once on page load

  // Form validation for contact/application forms with enhanced feedback
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    // Validate fields in real-time
    const formInputs = form.querySelectorAll('input, textarea')
    formInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.checkValidity()) {
          input.classList.add('is-valid')
          input.classList.remove('is-invalid')
        } else {
          input.classList.add('is-invalid')
          input.classList.remove('is-valid')
        }
      })
    })

    // Form submission
    form.addEventListener(
      'submit',
      event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()

          // Scroll to first invalid field
          const firstInvalid = form.querySelector(':invalid')
          if (firstInvalid) {
            firstInvalid.focus()
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }

        form.classList.add('was-validated')
      },
      false
    )
  })

  // Add hover effect to cards and buttons with hover-float class
  document.querySelectorAll('.hover-float').forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-5px)'
      element.style.transition = 'transform 0.3s ease'
    })

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)'
    })
  })

  // Initialize counter animations for statistics if they exist
  const counterElements = document.querySelectorAll('.counter')
  if (counterElements.length > 0) {
    const animateCounter = (element, target) => {
      let current = 0
      const increment = target / 50 // Divide animation into steps
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        element.textContent = Math.floor(current)
      }, 30)
    }

    // Trigger counter animations when elements come into view
    const observeCounters = () => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const target = parseInt(entry.target.getAttribute('data-target'))
              animateCounter(entry.target, target)
              observer.unobserve(entry.target) // Only animate once
            }
          })
        },
        { threshold: 0.5 }
      )

      counterElements.forEach(counter => {
        observer.observe(counter)
      })
    }

    observeCounters()
  }
})
