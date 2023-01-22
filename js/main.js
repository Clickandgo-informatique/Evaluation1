const cookiesBanner = document.querySelector('.cookies-banner-fr')
const cookiesBannerAcceptButton = document.querySelector('.accept-cookies')
const cookiesBannerDeclineButton = document.querySelector('.decline-cookies')
const cookieName = 'cookiesBanner'
window.onload = () => {

    const hasCookie = getCookie(cookieName)
    if (!hasCookie) {
        cookiesBanner.classList.remove('hidden')
    }

    cookiesBannerAcceptButton.addEventListener('click', () => {
        setCookie(cookieName, 'closed')
        cookiesBanner.remove()
    })

    cookiesBannerDeclineButton.addEventListener('click', () => {
        cookiesBanner.remove()
    })

}

const getCookie = (name) => {
    const value = " " + document.cookie
    console.log("value", `==${value}==`)
    const parts = value.split(" " + name + "=")
    return parts.length < 2 ? undefined : parts.pop().split(";").shift()
}

const setCookie = function (name, value, expiryDays, domain, path, secure) {
    const exDate = new Date()
    exDate.setHours(exDate.getHours() + (typeof expiryDays !== "number" ? 365 : expiryDays) * 24)

    document.cookie =
        name +
        "=" +
        value +
        "expires=" +
        exDate.toUTCString() + ";path=" +
        (path || "/") +
        (domain ? ";domain=" + domain : "") +
        (secure ? ";secure" : "")
}