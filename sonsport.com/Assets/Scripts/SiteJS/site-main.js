﻿function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, t) {
    for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
    }
}

function _createClass(e, t, n) {
    return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function crop() {
    $("#cropbox").cropper({
        aspectRatio: 1,
        zoomable: !1,
        viewMode: 3,
        data: {
            x: 0,
            y: 0,
            width: 300,
            height: 300
        },
        preview: ".img-preview",
        crop: function (e) {
            $("#user_crop_x").val(e.x), $("#user_crop_y").val(e.y), $("#user_crop_w").val(e.width), $("#user_crop_h").val(e.height)
        }
    })
}

function init() {
    $(".sidenav").sidenav(), $("select").formSelect(), $("ul.tabs").tabs(), $(".collapsible").collapsible(), $(".dropdown-trigger").dropdown(), $(".tooltipped").tooltip(), M.updateTextFields();
    var e = document.querySelector(".stepper");
    if (e && new MStepper(e, {}), $(".modal").modal({
        inDuration: 300,
        outDuration: 100,
        onOpenStart: function () {
            initMap()
        }
    }),
        navigator.geolocation && "/" == window.location.pathname && navigator.geolocation.getCurrentPosition(function (e) {
        var t = new google.maps.Geocoder,
            n = {
                lat: e.coords.latitude,
                lng: e.coords.longitude
                };

        t.geocode({
            location: n
        }, function (e, t) {
            if (t == google.maps.GeocoderStatus.OK) {
                for (var n = e[0].address_components.length - 1; 0 <= n; n--) e[0].address_components[n].types.includes("administrative_area_level_1") && (user_city = e[0].address_components[n].short_name.trim()), e[0].address_components[n].types.includes("administrative_area_level_2") && (user_district = e[0].address_components[n].short_name.trim());
                user_city && user_district && 0 < $("#city option:contains(" + user_city + ")").length && ($("#city option:contains(" + user_city + ")").is(":selected") ? $("#district_id").val($("#district_id option:contains(" + user_district + ")").val()) : ($("#city").val($("#city option:contains(" + user_city + ")").val()), city_id = $("#city option:selected").val(), $.get({
                    url: "/api/v1/cities/" + city_id.toString() + "/districts.json"
                }, function (e) {
                    for (var t = "", n = e.length - 1; 0 <= n; n--) t += "<option value=" + e[n].id + ">" + e[n].name + "</option>";
                    $("#district_id").html(t), $("#district_id").val($("#district_id option:contains(" + user_district + ")").val())
                })))
            }
        })
    }, function () { }, {
            enableHighAccuracy: !0,
            timeout: 5e3,
            maximumAge: 18e5
        }), $("#booking_date").change(function (e) {
            e.preventDefault(), $(".date-output").val($("#booking_date").val()), $("#find_available_time_slots_form").submit()
        }), $(".carousel").carousel({
            dist: 0,
            padding: 0,
            fullWidth: !0,
            indicators: !0
        }), "/" == window.location.pathname && $(document).scrollTop() <= 64 && ($(".sporta-nav").css("position", "absolute"), $(".sporta-nav nav").css("background-color", "transparent"), $(".sporta-nav input").css("color", "white")), $(document).scroll(function () {
            changeStyleHeader($(this).scrollTop())
        }), $(document).bind("touchmove", function () {
            changeStyleHeader($(this).scrollTop())
        }), setTimeout(function () {
            $(".error_messages span").each(function () {
                M.toast({
                    html: $(this).html(),
                    displayLength: 4e3,
                    classes: $(this).attr("data-class")
                })
            })
        }, 1e3), i18n_datepicker = {
            months: ["Thg M\u1ed9t", "Thg Hai", "Thg Ba", "Thg T\u01b0", "Thg N\u0103m", "Thg S\xe1u", "Thg B\u1ea3y", "Thg T\xe1m", "Thg Ch\xedn", "Thg M\u01b0\u1eddi", "Thg M\u01b0\u1eddi M\u1ed9t", "Thg M\u01b0\u1eddi Hai"],
            monthsShort: ["Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6", "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"],
            weekdays: ["Ch\u1ee7 Nh\u1eadt", "Th\u1ee9 Hai", "Th\u1ee9 Ba", "Th\u1ee9 T\u01b0", "Th\u1ee9 N\u0103m", "Th\u1ee9 S\xe1u", "Th\u1ee9 B\u1ea3y"],
            weekdaysShort: ["C.Nh\u1eadt", "T.Hai", "T.Ba", "T.T\u01b0", "T.N\u0103m", "T.S\xe1u", "T.B\u1ea3y"],
            weekdaysAbbrev: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            today: "H\xf4m Nay",
            clear: "Xo\xe1",
            firstDay: 1
        }, $("#booking_date").datepicker({
            autoClose: !0,
            minDate: 20 < (new Date).getHours() ? new Date((new Date).getTime() + 864e5) : new Date,
            i18n: i18n_datepicker,
            format: "dddd, dd/mm/yy",
            container: "body",
            setDefaultDate: !0,
            defaultDate: new Date((new Date).getTime() + 864e5),
            onSelect: function (e) {
                var t = new Date;
                current_hour = t.getHours(), tmr = new Date(t.getTime() + 864e5), e.getDate() == t.getDate() || 20 <= current_hour && e.getDate() == tmr.getDate() ? update_select_begin_time((new Date).getHours() + 6) : update_select_begin_time(0)
            }
        }), 0 < $("#find_available_time_slots_form").length && setInterval(function () {
            $("#find_available_time_slots_form").submit()
        }, 3e5), $(".timepicker").timepicker({
            container: "div#content",
            autoClose: !0,
            twelveHour: !1
        }), $("#venue_map").length) {
        venue_info = $("#venue_map"), lat_lng = {
            lat: parseFloat(venue_info.attr("lat")),
            lng: parseFloat(venue_info.attr("lng"))
        };
        var t = new google.maps.Map(document.getElementById("venue_map"), {
            zoom: 13,
            center: lat_lng,
            scrollwheel: !1
        });
        new google.maps.Marker({
            position: lat_lng,
            map: t,
            title: venue_info.attr("name")
        })
    }
    $(".btnSubmitVenue").click(function () {
        $("#formNewVenue")[0].checkValidity() && $(".overlay").show()
    }), AccountKit_OnInteractive = function () {
        var e = $('meta[name~="csrf-token"]').attr("content");
        AccountKit.init({
            appId: "1761051974180267",
            state: e,
            version: "v1.1",
            fbAppEventsEnabled: !1,
            redirect: '<%= Rails.env.production? ? "https://www.sporta.vn" : "http://localhost:3000"%>'
        })
    }
}

function changeStyleHeader(e) {
    "/" == window.location.pathname && e < 64 && ($(".sporta-nav").css("position", "absolute"), $("nav").css("background-color", "transparent"), $(".sporta-nav input").css("color", "white"), $('nav .brand-logo, nav ul.nav-desktop > li > a, nav a[data-target="nav-mobile"]').css("color", "#fb8c00")), "/" == window.location.pathname && 64 < e && ($(".sporta-nav nav").css("position", "fixed"), $(".sporta-nav nav").css("top", "0"), $("nav").css("background-color", "#fafafa"), $(".sporta-nav input").css("color", "#3d348b"), $('nav .brand-logo, nav ul.nav-desktop > li > a, nav a[data-target="nav-mobile"]').css("color", "#fb8c00"), $("#venues-info-form").css("display", "block"))
}

function update_select_begin_time(e) {
    html_options = "", minutes = ["00", "30"], 24 < e && (e -= 24);
    for (var t = e; t < 24; t++)
        for (var n = 0; n < minutes.length; n++) time = t < 10 ? "0" + t.toString() + ":" + minutes[n] : t.toString() + ":" + minutes[n], html_options += '<option value="' + time + '">' + time + "</option>";
    $("#begin_time").html(html_options), url_string = window.location.href, url = new URL(url_string), c = url.searchParams.get("begin_time"), c || (c = "16:00"), 0 == e ? $("#begin_time").val(c) : $("#begin_time").val($("#begin_time option:first-child").text()), $("select").formSelect()
}

function copyToClipboard(e) {
    var t = document.createElement("textarea");
    t.value = e, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", document.body.appendChild(t);
    var n = 0 < document.getSelection().rangeCount && document.getSelection().getRangeAt(0);
    t.select(), document.execCommand("copy"), document.body.removeChild(t), n && (document.getSelection().removeAllRanges(), document.getSelection().addRange(n))
}

function loginCallback(e) {
    if ("PARTIALLY_AUTHENTICATED" === e.status) {
        var t = e.code;
        $.ajax({
            url: "/users/confirm_phone_number.js",
            method: "PUT",
            data: {
                code: t
            }
        })
    } else "NOT_AUTHENTICATED" === e.status || e.status
}

function smsLogin() {
    var e = document.getElementById("user_phone_attributes_number");
    e && (e = e.value), AccountKit.login("PHONE", {
        countryCode: "+84",
        phoneNumber: e
    }, loginCallback)
}

function booking() {
    $("#book-modal").modal({
        ready: function (e, t) {
            $(e).find("input#asset_id").val($(t).attr("data-asset-id")), $(e).find("#venue_name").html($(t).attr("data-venue-name")), $(e).find("#venue_address").html("\u0110\u1ecba ch\u1ec9: " + $(t).attr("data-venue-address")), $(e).find("#begin_time").html($("#booking_date").val() + ", t\u1eeb " + $("#begin_time").val() + " t\u1edbi " + end_time($("#begin_time").val(), $("#how_long").find(":selected").val())), $(e).find("#price").html($(t).attr("data-price"))
        }
    })
}

function copyToClipboard(e) {
    var t = $("<input>");
    $("body").append(t), t.val($(e).text()).select(), document.execCommand("copy"), t.remove()
}

function end_time() {
    return ""
}

function initMap() {
    if ($("#map").length) {
        if (venue_lat = $("#latitude").val(), venue_lng = $("#longitude").val(), venue_lat) var e = {
            lat: parseFloat(venue_lat),
            lng: parseFloat(venue_lng)
        };
        else e = {
            lat: 10.801235,
            lng: 106.664185
        };
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: e,
            scrollwheel: !1
        }), marker = new google.maps.Marker({
            position: e,
            map: map,
            title: "K\xe9o t\xf4i t\u1edbi v\u1ecb tr\xed s\xe2n ch\xednh x\xe1c!"
        }), navigator.geolocation && !venue_lat ? navigator.geolocation.getCurrentPosition(function (e) {
            var t = {
                lat: e.coords.latitude,
                lng: e.coords.longitude
            };
            map.setCenter(t), marker.setPosition(t)
        }, function () {
            handleLocationError(!0, map.getCenter())
        }) : handleLocationError(!1, map.getCenter()), map.addListener("center_changed", function () {
            marker.setPosition(map.getCenter()), $("#latitude").val(marker.getPosition().lat()), $("#longitude").val(marker.getPosition().lng())
        })
    }
    $(document).on("change", ".address_street input, .address_district select, .address_city select", function () {
        setTimeout(function () {
            codeAddress(map)
        }, 1e3)
    })
}

function handleLocationError(e, t) {
    console.log(e, t)
}

function codeAddress(n) {
    var e = $(".address_street input").val() + ", " + $(".address_district option:selected").text() + ", " + $(".address_city option:selected").text() + ", Vi\u1ec7t Nam";
    geocoder = new google.maps.Geocoder, geocoder.geocode({
        address: e
    }, function (e, t) {
        "OK" == t ? (n.setCenter(e[0].geometry.location), marker.setPosition(n.getCenter())) : M.toast({
            html: "B\u1ea1n c\xf3 th\u1ec3 k\xe9o b\u1ea3n \u0111\u1ed3 \u0111\u1ec3 marker tr\u1ecf ch\xednh x\xe1c v\xe0o v\u1ecb tr\xed s\xe2n b\u1ea1n mu\u1ed1n chia s\u1ebb. C\u1ea3m \u01a1n!",
            displayLength: 2e3
        })
    })
} ! function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (C, e) {
    function r(e) {
        var t = !!e && "length" in e && e.length,
            n = pe.type(e);
        return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }

    function t(e, n, i) {
        if (pe.isFunction(n)) return pe.grep(e, function (e, t) {
            return !!n.call(e, t, e) !== i
        });
        if (n.nodeType) return pe.grep(e, function (e) {
            return e === n !== i
        });
        if ("string" == typeof n) {
            if (Ce.test(n)) return pe.filter(n, e, i);
            n = pe.filter(n, e)
        }
        return pe.grep(e, function (e) {
            return -1 < pe.inArray(e, n) !== i
        })
    }

    function n(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function d(e) {
        var n = {};
        return pe.each(e.match(De) || [], function (e, t) {
            n[t] = !0
        }), n
    }

    function o() {
        ie.addEventListener ? (ie.removeEventListener("DOMContentLoaded", a), C.removeEventListener("load", a)) : (ie.detachEvent("onreadystatechange", a), C.detachEvent("onload", a))
    }

    function a() {
        (ie.addEventListener || "load" === C.event.type || "complete" === ie.readyState) && (o(), pe.ready())
    }

    function l(e, t, n) {
        if (n === undefined && 1 === e.nodeType) {
            var i = "data-" + t.replace(Be, "-$1").toLowerCase();
            if ("string" == typeof (n = e.getAttribute(i))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Ae.test(n) ? pe.parseJSON(n) : n)
                } catch (o) { }
                pe.data(e, t, n)
            } else n = undefined
        }
        return n
    }

    function u(e) {
        var t;
        for (t in e)
            if (("data" !== t || !pe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function i(e, t, n, i) {
        if ($e(e)) {
            var o, a, s = pe.expando,
                r = e.nodeType,
                l = r ? pe.cache : e,
                u = r ? e[s] : e[s] && s;
            if (u && l[u] && (i || l[u].data) || n !== undefined || "string" != typeof t) return u || (u = r ? e[s] = ne.pop() || pe.guid++ : s), l[u] || (l[u] = r ? {} : {
                toJSON: pe.noop
            }), "object" != typeof t && "function" != typeof t || (i ? l[u] = pe.extend(l[u], t) : l[u].data = pe.extend(l[u].data, t)), a = l[u], i || (a.data || (a.data = {}), a = a.data), n !== undefined && (a[pe.camelCase(t)] = n), "string" == typeof t ? null == (o = a[t]) && (o = a[pe.camelCase(t)]) : o = a, o
        }
    }

    function s(e, t, n) {
        if ($e(e)) {
            var i, o, a = e.nodeType,
                s = a ? pe.cache : e,
                r = a ? e[pe.expando] : pe.expando;
            if (s[r]) {
                if (t && (i = n ? s[r] : s[r].data)) {
                    o = (t = pe.isArray(t) ? t.concat(pe.map(t, pe.camelCase)) : t in i ? [t] : (t = pe.camelCase(t)) in i ? [t] : t.split(" ")).length;
                    for (; o--;) delete i[t[o]];
                    if (n ? !u(i) : !pe.isEmptyObject(i)) return
                } (n || (delete s[r].data, u(s[r]))) && (a ? pe.cleanData([e], !0) : ce.deleteExpando || s != s.window ? delete s[r] : s[r] = undefined)
            }
        }
    }

    function c(e, t, n, i) {
        var o, a = 1,
            s = 20,
            r = i ? function () {
                return i.cur()
            } : function () {
                return pe.css(e, t, "")
            },
            l = r(),
            u = n && n[3] || (pe.cssNumber[t] ? "" : "px"),
            d = (pe.cssNumber[t] || "px" !== u && +l) && He.exec(pe.css(e, t));
        if (d && d[3] !== u)
            for (u = u || d[3], n = n || [], d = +l || 1; d /= a = a || ".5", pe.style(e, t, d + u), a !== (a = r() / l) && 1 !== a && --s;);
        return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = d, i.end = o)), o
    }

    function v(e) {
        var t = Ye.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }

    function g(e, t) {
        var n, i, o = 0,
            a = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : undefined;
        if (!a)
            for (a = [], n = e.childNodes || e; null != (i = n[o]); o++) !t || pe.nodeName(i, t) ? a.push(i) : pe.merge(a, g(i, t));
        return t === undefined || t && pe.nodeName(e, t) ? pe.merge([e], a) : a
    }

    function y(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++) pe._data(n, "globalEval", !t || pe._data(t[i], "globalEval"))
    }

    function b(e) {
        qe.test(e.type) && (e.defaultChecked = e.checked)
    }

    function m(e, t, n, i, o) {
        for (var a, s, r, l, u, d, c, h = e.length, p = v(t), f = [], m = 0; m < h; m++)
            if ((s = e[m]) || 0 === s)
                if ("object" === pe.type(s)) pe.merge(f, s.nodeType ? [s] : s);
                else if (Ke.test(s)) {
                    for (l = l || p.appendChild(t.createElement("div")), u = (ze.exec(s) || ["", ""])[1].toLowerCase(), c = Ue[u] || Ue._default, l.innerHTML = c[1] + pe.htmlPrefilter(s) + c[2], a = c[0]; a--;) l = l.lastChild;
                    if (!ce.leadingWhitespace && Ve.test(s) && f.push(t.createTextNode(Ve.exec(s)[0])), !ce.tbody)
                        for (a = (s = "table" !== u || Ze.test(s) ? "<table>" !== c[1] || Ze.test(s) ? 0 : l : l.firstChild) && s.childNodes.length; a--;) pe.nodeName(d = s.childNodes[a], "tbody") && !d.childNodes.length && s.removeChild(d);
                    for (pe.merge(f, l.childNodes), l.textContent = ""; l.firstChild;) l.removeChild(l.firstChild);
                    l = p.lastChild
                } else f.push(t.createTextNode(s));
        for (l && p.removeChild(l), ce.appendChecked || pe.grep(g(f, "input"), b), m = 0; s = f[m++];)
            if (i && -1 < pe.inArray(s, i)) o && o.push(s);
            else if (r = pe.contains(s.ownerDocument, s), l = g(p.appendChild(s), "script"), r && y(l), n)
                for (a = 0; s = l[a++];) Xe.test(s.type || "") && n.push(s);
        return l = null, p
    }

    function h() {
        return !0
    }

    function p() {
        return !1
    }

    function f() {
        try {
            return ie.activeElement
        } catch (e) { }
    }

    function _(e, t, n, i, o, a) {
        var s, r;
        if ("object" == typeof t) {
            for (r in "string" != typeof n && (i = i || n, n = undefined), t) _(e, r, n, i, t[r], a);
            return e
        }
        if (null == i && null == o ? (o = n, i = n = undefined) : null == o && ("string" == typeof n ? (o = i, i = undefined) : (o = i, i = n, n = undefined)), !1 === o) o = p;
        else if (!o) return e;
        return 1 === a && (s = o, (o = function (e) {
            return pe().off(e), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = pe.guid++)), e.each(function () {
            pe.event.add(this, t, o, i, n)
        })
    }

    function w(e, t) {
        return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function x(e) {
        return e.type = (null !== pe.find.attr(e, "type")) + "/" + e.type, e
    }

    function k(e) {
        var t = rt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function E(e, t) {
        if (1 === t.nodeType && pe.hasData(e)) {
            var n, i, o, a = pe._data(e),
                s = pe._data(t, a),
                r = a.events;
            if (r)
                for (n in delete s.handle, s.events = {}, r)
                    for (i = 0, o = r[n].length; i < o; i++) pe.event.add(t, n, r[n][i]);
            s.data && (s.data = pe.extend({}, s.data))
        }
    }

    function T(e, t) {
        var n, i, o;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ce.noCloneEvent && t[pe.expando]) {
                for (i in (o = pe._data(t)).events) pe.removeEvent(t, i, o.handle);
                t.removeAttribute(pe.expando)
            }
            "script" === n && t.text !== e.text ? (x(t).text = e.text, k(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ce.html5Clone && e.innerHTML && !pe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && qe.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }
    }

    function M(n, i, o, a) {
        i = ae.apply([], i);
        var e, t, s, r, l, u, d = 0,
            c = n.length,
            h = c - 1,
            p = i[0],
            f = pe.isFunction(p);
        if (f || 1 < c && "string" == typeof p && !ce.checkClone && st.test(p)) return n.each(function (e) {
            var t = n.eq(e);
            f && (i[0] = p.call(this, e, t.html())), M(t, i, o, a)
        });
        if (c && (e = (u = m(i, n[0].ownerDocument, !1, n, a)).firstChild, 1 === u.childNodes.length && (u = e), e || a)) {
            for (s = (r = pe.map(g(u, "script"), x)).length; d < c; d++) t = u, d !== h && (t = pe.clone(t, !0, !0), s && pe.merge(r, g(t, "script"))), o.call(n[d], t, d);
            if (s)
                for (l = r[r.length - 1].ownerDocument, pe.map(r, k), d = 0; d < s; d++) t = r[d], Xe.test(t.type || "") && !pe._data(t, "globalEval") && pe.contains(l, t) && (t.src ? pe._evalUrl && pe._evalUrl(t.src) : pe.globalEval((t.text || t.textContent || t.innerHTML || "").replace(lt, "")));
            u = e = null
        }
        return n
    }

    function S(e, t, n) {
        for (var i, o = t ? pe.filter(t, e) : e, a = 0; null != (i = o[a]); a++) n || 1 !== i.nodeType || pe.cleanData(g(i)), i.parentNode && (n && pe.contains(i.ownerDocument, i) && y(g(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function L(e, t) {
        var n = pe(t.createElement(e)).appendTo(t.body),
            i = pe.css(n[0], "display");
        return n.detach(), i
    }

    function D(e) {
        var t = ie,
            n = ct[e];
        return n || ("none" !== (n = L(e, t)) && n || ((t = ((dt = (dt || pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || dt[0].contentDocument).document).write(), t.close(), n = L(e, t), dt.detach()), ct[e] = n), n
    }

    function O(e, t) {
        return {
            get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }

    function $(e) {
        if (e in Tt) return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Et.length; n--;)
            if ((e = Et[n] + t) in Tt) return e
    }

    function A(e, t) {
        for (var n, i, o, a = [], s = 0, r = e.length; s < r; s++)(i = e[s]).style && (a[s] = pe._data(i, "olddisplay"), n = i.style.display, t ? (a[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && je(i) && (a[s] = pe._data(i, "olddisplay", D(i.nodeName)))) : (o = je(i), (n && "none" !== n || !o) && pe._data(i, "olddisplay", o ? n : pe.css(i, "display"))));
        for (s = 0; s < r; s++)(i = e[s]).style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[s] || "" : "none"));
        return e
    }

    function B(e, t, n) {
        var i = xt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function I(e, t, n, i, o) {
        for (var a = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; a < 4; a += 2) "margin" === n && (s += pe.css(e, n + Fe[a], !0, o)), i ? ("content" === n && (s -= pe.css(e, "padding" + Fe[a], !0, o)), "margin" !== n && (s -= pe.css(e, "border" + Fe[a] + "Width", !0, o))) : (s += pe.css(e, "padding" + Fe[a], !0, o), "padding" !== n && (s += pe.css(e, "border" + Fe[a] + "Width", !0, o)));
        return s
    }

    function R(e, t, n) {
        var i = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            a = vt(e),
            s = ce.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, a);
        if (o <= 0 || null == o) {
            if (((o = gt(e, t, a)) < 0 || null == o) && (o = e.style[t]), pt.test(o)) return o;
            i = s && (ce.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + I(e, t, n || (s ? "border" : "content"), i, a) + "px"
    }

    function P(e, t, n, i, o) {
        return new P.prototype.init(e, t, n, i, o)
    }

    function N() {
        return C.setTimeout(function () {
            Mt = undefined
        }), Mt = pe.now()
    }

    function H(e, t) {
        var n, i = {
            height: e
        },
            o = 0;
        for (t = t ? 1 : 0; o < 4; o += 2 - t) i["margin" + (n = Fe[o])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function F(e, t, n) {
        for (var i, o = (q.tweeners[t] || []).concat(q.tweeners["*"]), a = 0, s = o.length; a < s; a++)
            if (i = o[a].call(n, t, e)) return i
    }

    function j(t, e, n) {
        var i, o, a, s, r, l, u, d = this,
            c = {},
            h = t.style,
            p = t.nodeType && je(t),
            f = pe._data(t, "fxshow");
        for (i in n.queue || (null == (r = pe._queueHooks(t, "fx")).unqueued && (r.unqueued = 0, l = r.empty.fire, r.empty.fire = function () {
            r.unqueued || l()
        }), r.unqueued++ , d.always(function () {
            d.always(function () {
                r.unqueued-- , pe.queue(t, "fx").length || r.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === ("none" === (u = pe.css(t, "display")) ? pe._data(t, "olddisplay") || D(t.nodeName) : u) && "none" === pe.css(t, "float") && (ce.inlineBlockNeedsLayout && "inline" !== D(t.nodeName) ? h.zoom = 1 : h.display = "inline-block")), n.overflow && (h.overflow = "hidden", ce.shrinkWrapBlocks() || d.always(function () {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        })), e)
            if (o = e[i], Bt.exec(o)) {
                if (delete e[i], a = a || "toggle" === o, o === (p ? "hide" : "show")) {
                    if ("show" !== o || !f || f[i] === undefined) continue;
                    p = !0
                }
                c[i] = f && f[i] || pe.style(t, i)
            } else u = undefined;
        if (pe.isEmptyObject(c)) "inline" === ("none" === u ? D(t.nodeName) : u) && (h.display = u);
        else
            for (i in f ? "hidden" in f && (p = f.hidden) : f = pe._data(t, "fxshow", {}), a && (f.hidden = !p), p ? pe(t).show() : d.done(function () {
                pe(t).hide()
            }), d.done(function () {
                var e;
                for (e in pe._removeData(t, "fxshow"), c) pe.style(t, e, c[e])
            }), c) s = F(p ? f[i] : 0, i, d), i in f || (f[i] = s.start, p && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
    }

    function W(e, t) {
        var n, i, o, a, s;
        for (n in e)
            if (o = t[i = pe.camelCase(n)], a = e[n], pe.isArray(a) && (o = a[1], a = e[n] = a[0]), n !== i && (e[i] = a, delete e[n]), (s = pe.cssHooks[i]) && "expand" in s)
                for (n in a = s.expand(a), delete e[i], a) n in e || (e[n] = a[n], t[n] = o);
            else t[i] = o
    }

    function q(a, e, t) {
        var n, s, i = 0,
            o = q.prefilters.length,
            r = pe.Deferred().always(function () {
                delete l.elem
            }),
            l = function () {
                if (s) return !1;
                for (var e = Mt || N(), t = Math.max(0, u.startTime + u.duration - e), n = 1 - (t / u.duration || 0), i = 0, o = u.tweens.length; i < o; i++) u.tweens[i].run(n);
                return r.notifyWith(a, [u, n, t]), n < 1 && o ? t : (r.resolveWith(a, [u]), !1)
            },
            u = r.promise({
                elem: a,
                props: pe.extend({}, e),
                opts: pe.extend(!0, {
                    specialEasing: {},
                    easing: pe.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: Mt || N(),
                duration: t.duration,
                tweens: [],
                createTween: function (e, t) {
                    var n = pe.Tween(a, u.opts, e, t, u.opts.specialEasing[e] || u.opts.easing);
                    return u.tweens.push(n), n
                },
                stop: function (e) {
                    var t = 0,
                        n = e ? u.tweens.length : 0;
                    if (s) return this;
                    for (s = !0; t < n; t++) u.tweens[t].run(1);
                    return e ? (r.notifyWith(a, [u, 1, 0]), r.resolveWith(a, [u, e])) : r.rejectWith(a, [u, e]), this
                }
            }),
            d = u.props;
        for (W(d, u.opts.specialEasing); i < o; i++)
            if (n = q.prefilters[i].call(u, a, d, u.opts)) return pe.isFunction(n.stop) && (pe._queueHooks(u.elem, u.opts.queue).stop = pe.proxy(n.stop, n)), n;
        return pe.map(d, F, u), pe.isFunction(u.opts.start) && u.opts.start.call(a, u), pe.fx.timer(pe.extend(l, {
            elem: a,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function z(e) {
        return pe.attr(e, "class") || ""
    }

    function X(a) {
        return function (e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, i = 0,
                o = e.toLowerCase().match(De) || [];
            if (pe.isFunction(t))
                for (; n = o[i++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (a[n] = a[n] || []).unshift(t)) : (a[n] = a[n] || []).push(t)
        }
    }

    function V(t, o, a, s) {
        function r(e) {
            var i;
            return l[e] = !0, pe.each(t[e] || [], function (e, t) {
                var n = t(o, a, s);
                return "string" != typeof n || u || l[n] ? u ? !(i = n) : void 0 : (o.dataTypes.unshift(n), r(n), !1)
            }), i
        }
        var l = {},
            u = t === sn;
        return r(o.dataTypes[0]) || !l["*"] && r("*")
    }

    function Y(e, t) {
        var n, i, o = pe.ajaxSettings.flatOptions || {};
        for (i in t) t[i] !== undefined && ((o[i] ? e : n || (n = {}))[i] = t[i]);
        return n && pe.extend(!0, e, n), e
    }

    function U(e, t, n) {
        for (var i, o, a, s, r = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), o === undefined && (o = e.mimeType || t.getResponseHeader("Content-Type"));
        if (o)
            for (s in r)
                if (r[s] && r[s].test(o)) {
                    l.unshift(s);
                    break
                }
        if (l[0] in n) a = l[0];
        else {
            for (s in n) {
                if (!l[0] || e.converters[s + " " + l[0]]) {
                    a = s;
                    break
                }
                i || (i = s)
            }
            a = a || i
        }
        if (a) return a !== l[0] && l.unshift(a), n[a]
    }

    function K(e, t, n, i) {
        var o, a, s, r, l, u = {},
            d = e.dataTypes.slice();
        if (d[1])
            for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
        for (a = d.shift(); a;)
            if (e.responseFields[a] && (n[e.responseFields[a]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = a, a = d.shift())
                if ("*" === a) a = l;
                else if ("*" !== l && l !== a) {
                    if (!(s = u[l + " " + a] || u["* " + a]))
                        for (o in u)
                            if ((r = o.split(" "))[1] === a && (s = u[l + " " + r[0]] || u["* " + r[0]])) {
                                !0 === s ? s = u[o] : !0 !== u[o] && (a = r[0], d.unshift(r[1]));
                                break
                            }
                    if (!0 !== s)
                        if (s && e["throws"]) t = s(t);
                        else try {
                            t = s(t)
                        } catch (c) {
                            return {
                                state: "parsererror",
                                error: s ? c : "No conversion from " + l + " to " + a
                            }
                        }
                }
        return {
            state: "success",
            data: t
        }
    }

    function Z(e) {
        return e.style && e.style.display || pe.css(e, "display")
    }

    function Q(e) {
        if (!pe.contains(e.ownerDocument || ie, e)) return !0;
        for (; e && 1 === e.nodeType;) {
            if ("none" === Z(e) || "hidden" === e.type) return !0;
            e = e.parentNode
        }
        return !1
    }

    function G(n, e, i, o) {
        var t;
        if (pe.isArray(e)) pe.each(e, function (e, t) {
            i || cn.test(n) ? o(n, t) : G(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, i, o)
        });
        else if (i || "object" !== pe.type(e)) o(n, e);
        else
            for (t in e) G(n + "[" + t + "]", e[t], i, o)
    }

    function J() {
        try {
            return new C.XMLHttpRequest
        } catch (e) { }
    }

    function ee() {
        try {
            return new C.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) { }
    }

    function te(e) {
        return pe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    var ne = [],
        ie = C.document,
        oe = ne.slice,
        ae = ne.concat,
        se = ne.push,
        re = ne.indexOf,
        le = {},
        ue = le.toString,
        de = le.hasOwnProperty,
        ce = {},
        he = "1.12.4",
        pe = function (e, t) {
            return new pe.fn.init(e, t)
        },
        fe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        me = /^-ms-/,
        ve = /-([\da-z])/gi,
        ge = function (e, t) {
            return t.toUpperCase()
        };
    pe.fn = pe.prototype = {
        jquery: he,
        constructor: pe,
        selector: "",
        length: 0,
        toArray: function () {
            return oe.call(this)
        },
        get: function (e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : oe.call(this)
        },
        pushStack: function (e) {
            var t = pe.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function (e) {
            return pe.each(this, e)
        },
        map: function (n) {
            return this.pushStack(pe.map(this, function (e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function () {
            return this.pushStack(oe.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor()
        },
        push: se,
        sort: ne.sort,
        splice: ne.splice
    }, pe.extend = pe.fn.extend = function (e) {
        var t, n, i, o, a, s, r = e || {},
            l = 1,
            u = arguments.length,
            d = !1;
        for ("boolean" == typeof r && (d = r, r = arguments[l] || {}, l++), "object" == typeof r || pe.isFunction(r) || (r = {}), l === u && (r = this, l--); l < u; l++)
            if (null != (a = arguments[l]))
                for (o in a) t = r[o], r !== (i = a[o]) && (d && i && (pe.isPlainObject(i) || (n = pe.isArray(i))) ? (n ? (n = !1, s = t && pe.isArray(t) ? t : []) : s = t && pe.isPlainObject(t) ? t : {}, r[o] = pe.extend(d, s, i)) : i !== undefined && (r[o] = i));
        return r
    }, pe.extend({
        expando: "jQuery" + (he + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
            throw new Error(e)
        },
        noop: function () { },
        isFunction: function (e) {
            return "function" === pe.type(e)
        },
        isArray: Array.isArray || function (e) {
            return "array" === pe.type(e)
        },
        isWindow: function (e) {
            return null != e && e == e.window
        },
        isNumeric: function (e) {
            var t = e && e.toString();
            return !pe.isArray(e) && 0 <= t - parseFloat(t) + 1
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        isPlainObject: function (e) {
            var t;
            if (!e || "object" !== pe.type(e) || e.nodeType || pe.isWindow(e)) return !1;
            try {
                if (e.constructor && !de.call(e, "constructor") && !de.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (!ce.ownFirst)
                for (t in e) return de.call(e, t);
            for (t in e);
            return t === undefined || de.call(e, t)
        },
        type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? le[ue.call(e)] || "object" : typeof e
        },
        globalEval: function (e) {
            e && pe.trim(e) && (C.execScript || function (e) {
                C.eval.call(C, e)
            })(e)
        },
        camelCase: function (e) {
            return e.replace(me, "ms-").replace(ve, ge)
        },
        nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (e, t) {
            var n, i = 0;
            if (r(e))
                for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i])) break; return e
        },
        trim: function (e) {
            return null == e ? "" : (e + "").replace(fe, "")
        },
        makeArray: function (e, t) {
            var n = t || [];
            return null != e && (r(Object(e)) ? pe.merge(n, "string" == typeof e ? [e] : e) : se.call(n, e)), n
        },
        inArray: function (e, t, n) {
            var i;
            if (t) {
                if (re) return re.call(t, e, n);
                for (i = t.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function (e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n;) e[o++] = t[i++];
            if (n != n)
                for (; t[i] !== undefined;) e[o++] = t[i++];
            return e.length = o, e
        },
        grep: function (e, t, n) {
            for (var i = [], o = 0, a = e.length, s = !n; o < a; o++) !t(e[o], o) !== s && i.push(e[o]);
            return i
        },
        map: function (e, t, n) {
            var i, o, a = 0,
                s = [];
            if (r(e))
                for (i = e.length; a < i; a++) null != (o = t(e[a], a, n)) && s.push(o);
            else
                for (a in e) null != (o = t(e[a], a, n)) && s.push(o);
            return ae.apply([], s)
        },
        guid: 1,
        proxy: function (e, t) {
            var n, i, o;
            return "string" == typeof t && (o = e[t], t = e, e = o), pe.isFunction(e) ? (n = oe.call(arguments, 2), (i = function () {
                return e.apply(t || this, n.concat(oe.call(arguments)))
            }).guid = e.guid = e.guid || pe.guid++ , i) : undefined
        },
        now: function () {
            return +new Date
        },
        support: ce
    }), "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ne[Symbol.iterator]), pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        le["[object " + t + "]"] = t.toLowerCase()
    });
    var ye = function (n) {
        function _(e, t, n, i) {
            var o, a, s, r, l, u, d, c, h = t && t.ownerDocument,
                p = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p) return n;
            if (!i && ((t ? t.ownerDocument || t : F) !== $ && O(t), t = t || $, B)) {
                if (11 !== p && (u = ge.exec(e)))
                    if (o = u[1]) {
                        if (9 === p) {
                            if (!(s = t.getElementById(o))) return n;
                            if (s.id === o) return n.push(s), n
                        } else if (h && (s = h.getElementById(o)) && N(t, s) && s.id === o) return n.push(s), n
                    } else {
                        if (u[2]) return G.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = u[3]) && g.getElementsByClassName && t.getElementsByClassName) return G.apply(n, t.getElementsByClassName(o)), n
                    }
                if (g.qsa && !X[e + " "] && (!I || !I.test(e))) {
                    if (1 !== p) h = t, c = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((r = t.getAttribute("id")) ? r = r.replace(be, "\\$&") : t.setAttribute("id", r = H), a = (d = E(e)).length, l = he.test(r) ? "#" + r : "[id='" + r + "']"; a--;) d[a] = l + " " + v(d[a]);
                        c = d.join(","), h = ye.test(e) && m(t.parentNode) || t
                    }
                    if (c) try {
                        return G.apply(n, h.querySelectorAll(c)), n
                    } catch (f) { } finally {
                            r === H && t.removeAttribute("id")
                        }
                }
            }
            return M(e.replace(re, "$1"), t, n, i)
        }

        function e() {
            function n(e, t) {
                return i.push(e + " ") > x.cacheLength && delete n[i.shift()], n[e + " "] = t
            }
            var i = [];
            return n
        }

        function l(e) {
            return e[H] = !0, e
        }

        function o(e) {
            var t = $.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function t(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = t
        }

        function u(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function i(t) {
            return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function a(n) {
            return function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }

        function s(s) {
            return l(function (a) {
                return a = +a, l(function (e, t) {
                    for (var n, i = s([], e.length, a), o = i.length; o--;) e[n = i[o]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }

        function m(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function r() { }

        function v(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i
        }

        function c(r, e, t) {
            var l = e.dir,
                u = t && "parentNode" === l,
                d = W++;
            return e.first ? function (e, t, n) {
                for (; e = e[l];)
                    if (1 === e.nodeType || u) return r(e, t, n)
            } : function (e, t, n) {
                var i, o, a, s = [j, d];
                if (n) {
                    for (; e = e[l];)
                        if ((1 === e.nodeType || u) && r(e, t, n)) return !0
                } else
                    for (; e = e[l];)
                        if (1 === e.nodeType || u) {
                            if ((i = (o = (a = e[H] || (e[H] = {}))[e.uniqueID] || (a[e.uniqueID] = {}))[l]) && i[0] === j && i[1] === d) return s[2] = i[2];
                            if ((o[l] = s)[2] = r(e, t, n)) return !0
                        }
            }
        }

        function h(o) {
            return 1 < o.length ? function (e, t, n) {
                for (var i = o.length; i--;)
                    if (!o[i](e, t, n)) return !1;
                return !0
            } : o[0]
        }

        function y(e, t, n) {
            for (var i = 0, o = t.length; i < o; i++) _(e, t[i], n);
            return n
        }

        function w(e, t, n, i, o) {
            for (var a, s = [], r = 0, l = e.length, u = null != t; r < l; r++)(a = e[r]) && (n && !n(a, i, o) || (s.push(a), u && t.push(r)));
            return s
        }

        function b(p, f, m, v, g, e) {
            return v && !v[H] && (v = b(v)), g && !g[H] && (g = b(g, e)), l(function (e, t, n, i) {
                var o, a, s, r = [],
                    l = [],
                    u = t.length,
                    d = e || y(f || "*", n.nodeType ? [n] : n, []),
                    c = !p || !e && f ? d : w(d, r, p, n, i),
                    h = m ? g || (e ? p : u || v) ? [] : t : c;
                if (m && m(c, h, n, i), v)
                    for (o = w(h, l), v(o, [], n, i), a = o.length; a--;)(s = o[a]) && (h[l[a]] = !(c[l[a]] = s));
                if (e) {
                    if (g || p) {
                        if (g) {
                            for (o = [], a = h.length; a--;)(s = h[a]) && o.push(c[a] = s);
                            g(null, h = [], o, i)
                        }
                        for (a = h.length; a--;)(s = h[a]) && -1 < (o = g ? ee(e, s) : r[a]) && (e[o] = !(t[o] = s))
                    }
                } else h = w(h === t ? h.splice(u, h.length) : h), g ? g(null, t, h, i) : G.apply(t, h)
            })
        }

        function p(e) {
            for (var o, t, n, i = e.length, a = x.relative[e[0].type], s = a || x.relative[" "], r = a ? 1 : 0, l = c(function (e) {
                return e === o
            }, s, !0), u = c(function (e) {
                return -1 < ee(o, e)
            }, s, !0), d = [function (e, t, n) {
                var i = !a && (n || t !== S) || ((o = t).nodeType ? l(e, t, n) : u(e, t, n));
                return o = null, i
            }]; r < i; r++)
                if (t = x.relative[e[r].type]) d = [c(h(d), t)];
                else {
                    if ((t = x.filter[e[r].type].apply(null, e[r].matches))[H]) {
                        for (n = ++r; n < i && !x.relative[e[n].type]; n++);
                        return b(1 < r && h(d), 1 < r && v(e.slice(0, r - 1).concat({
                            value: " " === e[r - 2].type ? "*" : ""
                        })).replace(re, "$1"), t, r < n && p(e.slice(r, n)), n < i && p(e = e.slice(n)), n < i && v(e))
                    }
                    d.push(t)
                }
            return h(d)
        }

        function d(v, g) {
            var y = 0 < g.length,
                b = 0 < v.length,
                e = function (e, t, n, i, o) {
                    var a, s, r, l = 0,
                        u = "0",
                        d = e && [],
                        c = [],
                        h = S,
                        p = e || b && x.find.TAG("*", o),
                        f = j += null == h ? 1 : Math.random() || .1,
                        m = p.length;
                    for (o && (S = t === $ || t || o); u !== m && null != (a = p[u]); u++) {
                        if (b && a) {
                            for (s = 0, t || a.ownerDocument === $ || (O(a), n = !B); r = v[s++];)
                                if (r(a, t || $, n)) {
                                    i.push(a);
                                    break
                                }
                            o && (j = f)
                        }
                        y && ((a = !r && a) && l-- , e && d.push(a))
                    }
                    if (l += u, y && u !== l) {
                        for (s = 0; r = g[s++];) r(d, c, t, n);
                        if (e) {
                            if (0 < l)
                                for (; u--;) d[u] || c[u] || (c[u] = Z.call(i));
                            c = w(c)
                        }
                        G.apply(i, c), o && !e && 0 < c.length && 1 < l + g.length && _.uniqueSort(i)
                    }
                    return o && (j = f, S = h), d
                };
            return y ? l(e) : e
        }
        var f, g, x, C, k, E, T, M, S, L, D, O, $, A, B, I, R, P, N, H = "sizzle" + 1 * new Date,
            F = n.document,
            j = 0,
            W = 0,
            q = e(),
            z = e(),
            X = e(),
            V = function (e, t) {
                return e === t && (D = !0), 0
            },
            Y = 1 << 31,
            U = {}.hasOwnProperty,
            K = [],
            Z = K.pop,
            Q = K.push,
            G = K.push,
            J = K.slice,
            ee = function (e, t) {
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
            ae = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            re = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            le = new RegExp("^" + ne + "*," + ne + "*"),
            ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            ce = new RegExp(ae),
            he = new RegExp("^" + ie + "$"),
            pe = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + ae),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            fe = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ye = /[+~]/,
            be = /'|\\/g,
            _e = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            we = function (e, t, n) {
                var i = "0x" + t - 65536;
                return i != i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            },
            xe = function () {
                O()
            };
        try {
            G.apply(K = J.call(F.childNodes), F.childNodes), K[F.childNodes.length].nodeType
        } catch (Ce) {
            G = {
                apply: K.length ? function (e, t) {
                    Q.apply(e, J.call(t))
                } : function (e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        for (f in g = _.support = {}, k = _.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, O = _.setDocument = function (e) {
            var t, n, i = e ? e.ownerDocument || e : F;
            return i !== $ && 9 === i.nodeType && i.documentElement && (A = ($ = i).documentElement, B = !k($), (n = $.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), g.attributes = o(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), g.getElementsByTagName = o(function (e) {
                return e.appendChild($.createComment("")), !e.getElementsByTagName("*").length
            }), g.getElementsByClassName = ve.test($.getElementsByClassName), g.getById = o(function (e) {
                return A.appendChild(e).id = H, !$.getElementsByName || !$.getElementsByName(H).length
            }), g.getById ? (x.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && B) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, x.filter.ID = function (e) {
                var t = e.replace(_e, we);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete x.find.ID, x.filter.ID = function (e) {
                var n = e.replace(_e, we);
                return function (e) {
                    var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n
                }
            }), x.find.TAG = g.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : g.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, i = [],
                    o = 0,
                    a = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = a[o++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return a
            }, x.find.CLASS = g.getElementsByClassName && function (e, t) {
                if ("undefined" != typeof t.getElementsByClassName && B) return t.getElementsByClassName(e)
            }, R = [], I = [], (g.qsa = ve.test($.querySelectorAll)) && (o(function (e) {
                A.appendChild(e).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || I.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + H + "-]").length || I.push("~="), e.querySelectorAll(":checked").length || I.push(":checked"), e.querySelectorAll("a#" + H + "+*").length || I.push(".#.+[+~]")
            }), o(function (e) {
                var t = $.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && I.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), I.push(",.*:")
            })), (g.matchesSelector = ve.test(P = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && o(function (e) {
                g.disconnectedMatch = P.call(e, "div"), P.call(e, "[s!='']:x"), R.push("!=", ae)
            }), I = I.length && new RegExp(I.join("|")), R = R.length && new RegExp(R.join("|")), t = ve.test(A.compareDocumentPosition), N = t || ve.test(A.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function (e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, V = t ? function (e, t) {
                if (e === t) return D = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !g.sortDetached && t.compareDocumentPosition(e) === n ? e === $ || e.ownerDocument === F && N(F, e) ? -1 : t === $ || t.ownerDocument === F && N(F, t) ? 1 : L ? ee(L, e) - ee(L, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t) return D = !0, 0;
                var n, i = 0,
                    o = e.parentNode,
                    a = t.parentNode,
                    s = [e],
                    r = [t];
                if (!o || !a) return e === $ ? -1 : t === $ ? 1 : o ? -1 : a ? 1 : L ? ee(L, e) - ee(L, t) : 0;
                if (o === a) return u(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) r.unshift(n);
                for (; s[i] === r[i];) i++;
                return i ? u(s[i], r[i]) : s[i] === F ? -1 : r[i] === F ? 1 : 0
            }), $
        }, _.matches = function (e, t) {
            return _(e, null, null, t)
        }, _.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== $ && O(e), t = t.replace(de, "='$1']"), g.matchesSelector && B && !X[t + " "] && (!R || !R.test(t)) && (!I || !I.test(t))) try {
                var n = P.call(e, t);
                if (n || g.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
            } catch (Ce) { }
            return 0 < _(t, $, null, [e]).length
        }, _.contains = function (e, t) {
            return (e.ownerDocument || e) !== $ && O(e), N(e, t)
        }, _.attr = function (e, t) {
            (e.ownerDocument || e) !== $ && O(e);
            var n = x.attrHandle[t.toLowerCase()],
                i = n && U.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !B) : undefined;
            return i !== undefined ? i : g.attributes || !B ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, _.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, _.uniqueSort = function (e) {
            var t, n = [],
                i = 0,
                o = 0;
            if (D = !g.detectDuplicates, L = !g.sortStable && e.slice(0), e.sort(V), D) {
                for (; t = e[o++];) t === e[o] && (i = n.push(o));
                for (; i--;) e.splice(n[i], 1)
            }
            return L = null, e
        }, C = _.getText = function (e) {
            var t, n = "",
                i = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[i++];) n += C(t);
            return n
        }, (x = _.selectors = {
            cacheLength: 50,
            createPseudo: l,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(_e, we), e[3] = (e[3] || e[4] || e[5] || "").replace(_e, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || _.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && _.error(e[0]), e
                },
                PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ce.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(_e, we).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function (e) {
                    var t = q[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && q(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function (n, i, o) {
                    return function (e) {
                        var t = _.attr(e, n);
                        return null == t ? "!=" === i : !i || (t += "", "=" === i ? t === o : "!=" === i ? t !== o : "^=" === i ? o && 0 === t.indexOf(o) : "*=" === i ? o && -1 < t.indexOf(o) : "$=" === i ? o && t.slice(-o.length) === o : "~=" === i ? -1 < (" " + t.replace(se, " ") + " ").indexOf(o) : "|=" === i && (t === o || t.slice(0, o.length + 1) === o + "-"))
                    }
                },
                CHILD: function (f, e, t, m, v) {
                    var g = "nth" !== f.slice(0, 3),
                        y = "last" !== f.slice(-4),
                        b = "of-type" === e;
                    return 1 === m && 0 === v ? function (e) {
                        return !!e.parentNode
                    } : function (e, t, n) {
                        var i, o, a, s, r, l, u = g !== y ? "nextSibling" : "previousSibling",
                            d = e.parentNode,
                            c = b && e.nodeName.toLowerCase(),
                            h = !n && !b,
                            p = !1;
                        if (d) {
                            if (g) {
                                for (; u;) {
                                    for (s = e; s = s[u];)
                                        if (b ? s.nodeName.toLowerCase() === c : 1 === s.nodeType) return !1;
                                    l = u = "only" === f && !l && "nextSibling"
                                }
                                return !0
                            }
                            if (l = [y ? d.firstChild : d.lastChild], y && h) {
                                for (p = (r = (i = (o = (a = (s = d)[H] || (s[H] = {}))[s.uniqueID] || (a[s.uniqueID] = {}))[f] || [])[0] === j && i[1]) && i[2], s = r && d.childNodes[r]; s = ++r && s && s[u] || (p = r = 0) || l.pop();)
                                    if (1 === s.nodeType && ++p && s === e) {
                                        o[f] = [j, r, p];
                                        break
                                    }
                            } else if (h && (p = r = (i = (o = (a = (s = e)[H] || (s[H] = {}))[s.uniqueID] || (a[s.uniqueID] = {}))[f] || [])[0] === j && i[1]), !1 === p)
                                for (;
                                    (s = ++r && s && s[u] || (p = r = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== c : 1 !== s.nodeType) || !++p || (h && ((o = (a = s[H] || (s[H] = {}))[s.uniqueID] || (a[s.uniqueID] = {}))[f] = [j, p]), s !== e)););
                            return (p -= v) === m || p % m == 0 && 0 <= p / m
                        }
                    }
                },
                PSEUDO: function (e, a) {
                    var t, s = x.pseudos[e] || x.setFilters[e.toLowerCase()] || _.error("unsupported pseudo: " + e);
                    return s[H] ? s(a) : 1 < s.length ? (t = [e, e, "", a], x.setFilters.hasOwnProperty(e.toLowerCase()) ? l(function (e, t) {
                        for (var n, i = s(e, a), o = i.length; o--;) e[n = ee(e, i[o])] = !(t[n] = i[o])
                    }) : function (e) {
                        return s(e, 0, t)
                    }) : s
                }
            },
            pseudos: {
                not: l(function (e) {
                    var i = [],
                        o = [],
                        r = T(e.replace(re, "$1"));
                    return r[H] ? l(function (e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function (e, t, n) {
                        return i[0] = e, r(i, null, n, o), i[0] = null, !o.pop()
                    }
                }),
                has: l(function (t) {
                    return function (e) {
                        return 0 < _(t, e).length
                    }
                }),
                contains: l(function (t) {
                    return t = t.replace(_e, we),
                        function (e) {
                            return -1 < (e.textContent || e.innerText || C(e)).indexOf(t)
                        }
                }),
                lang: l(function (n) {
                    return he.test(n || "") || _.error("unsupported lang: " + n), n = n.replace(_e, we).toLowerCase(),
                        function (e) {
                            var t;
                            do {
                                if (t = B ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                            } while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function (e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id
                },
                root: function (e) {
                    return e === A
                },
                focus: function (e) {
                    return e === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function (e) {
                    return !1 === e.disabled
                },
                disabled: function (e) {
                    return !0 === e.disabled
                },
                checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function (e) {
                    return !x.pseudos.empty(e)
                },
                header: function (e) {
                    return me.test(e.nodeName)
                },
                input: function (e) {
                    return fe.test(e.nodeName)
                },
                button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: s(function () {
                    return [0]
                }),
                last: s(function (e, t) {
                    return [t - 1]
                }),
                eq: s(function (e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: s(function (e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: s(function (e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: s(function (e, t, n) {
                    for (var i = n < 0 ? n + t : n; 0 <= --i;) e.push(i);
                    return e
                }),
                gt: s(function (e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }).pseudos.nth = x.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[f] = i(f);
        for (f in {
            submit: !0,
            reset: !0
        }) x.pseudos[f] = a(f);
        return r.prototype = x.filters = x.pseudos, x.setFilters = new r, E = _.tokenize = function (e, t) {
            var n, i, o, a, s, r, l, u = z[e + " "];
            if (u) return t ? 0 : u.slice(0);
            for (s = e, r = [], l = x.preFilter; s;) {
                for (a in n && !(i = le.exec(s)) || (i && (s = s.slice(i[0].length) || s), r.push(o = [])), n = !1, (i = ue.exec(s)) && (n = i.shift(), o.push({
                    value: n,
                    type: i[0].replace(re, " ")
                }), s = s.slice(n.length)), x.filter) !(i = pe[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
                    value: n,
                    type: a,
                    matches: i
                }), s = s.slice(n.length));
                if (!n) break
            }
            return t ? s.length : s ? _.error(e) : z(e, r).slice(0)
        }, T = _.compile = function (e, t) {
            var n, i = [],
                o = [],
                a = X[e + " "];
            if (!a) {
                for (t || (t = E(e)), n = t.length; n--;)(a = p(t[n]))[H] ? i.push(a) : o.push(a);
                (a = X(e, d(o, i))).selector = e
            }
            return a
        }, M = _.select = function (e, t, n, i) {
            var o, a, s, r, l, u = "function" == typeof e && e,
                d = !i && E(e = u.selector || e);
            if (n = n || [], 1 === d.length) {
                if (2 < (a = d[0] = d[0].slice(0)).length && "ID" === (s = a[0]).type && g.getById && 9 === t.nodeType && B && x.relative[a[1].type]) {
                    if (!(t = (x.find.ID(s.matches[0].replace(_e, we), t) || [])[0])) return n;
                    u && (t = t.parentNode), e = e.slice(a.shift().value.length)
                }
                for (o = pe.needsContext.test(e) ? 0 : a.length; o-- && (s = a[o], !x.relative[r = s.type]);)
                    if ((l = x.find[r]) && (i = l(s.matches[0].replace(_e, we), ye.test(a[0].type) && m(t.parentNode) || t))) {
                        if (a.splice(o, 1), !(e = i.length && v(a))) return G.apply(n, i), n;
                        break
                    }
            }
            return (u || T(e, d))(i, t, !B, n, !t || ye.test(e) && m(t.parentNode) || t), n
        }, g.sortStable = H.split("").sort(V).join("") === H, g.detectDuplicates = !!D, O(), g.sortDetached = o(function (e) {
            return 1 & e.compareDocumentPosition($.createElement("div"))
        }), o(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || t("type|href|height|width", function (e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), g.attributes && o(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || t("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), o(function (e) {
            return null == e.getAttribute("disabled")
        }) || t(te, function (e, t, n) {
            var i;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), _
    }(C);
    pe.find = ye, pe.expr = ye.selectors, pe.expr[":"] = pe.expr.pseudos, pe.uniqueSort = pe.unique = ye.uniqueSort, pe.text = ye.getText, pe.isXMLDoc = ye.isXML, pe.contains = ye.contains;
    var be = function (e, t, n) {
        for (var i = [], o = n !== undefined;
            (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (o && pe(e).is(n)) break;
                i.push(e)
            }
        return i
    },
        _e = function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        we = pe.expr.match.needsContext,
        xe = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        Ce = /^.[^:#\[\.,]*$/;
    pe.filter = function (e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? pe.find.matchesSelector(i, e) ? [i] : [] : pe.find.matches(e, pe.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, pe.fn.extend({
        find: function (e) {
            var t, n = [],
                i = this,
                o = i.length;
            if ("string" != typeof e) return this.pushStack(pe(e).filter(function () {
                for (t = 0; t < o; t++)
                    if (pe.contains(i[t], this)) return !0
            }));
            for (t = 0; t < o; t++) pe.find(e, i[t], n);
            return (n = this.pushStack(1 < o ? pe.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function (e) {
            return this.pushStack(t(this, e || [], !1))
        },
        not: function (e) {
            return this.pushStack(t(this, e || [], !0))
        },
        is: function (e) {
            return !!t(this, "string" == typeof e && we.test(e) ? pe(e) : e || [], !1).length
        }
    });
    var ke, Ee = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (pe.fn.init = function (e, t, n) {
        var i, o;
        if (!e) return this;
        if (n = n || ke, "string" == typeof e) {
            if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length ? [null, e, null] : Ee.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof pe ? t[0] : t, pe.merge(this, pe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : ie, !0)), xe.test(i[1]) && pe.isPlainObject(t))
                    for (i in t) pe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            if ((o = ie.getElementById(i[2])) && o.parentNode) {
                if (o.id !== i[2]) return ke.find(e);
                this.length = 1, this[0] = o
            }
            return this.context = ie, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : pe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(pe) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), pe.makeArray(e, this))
    }).prototype = pe.fn, ke = pe(ie);
    var Te = /^(?:parents|prev(?:Until|All))/,
        Me = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    pe.fn.extend({
        has: function (e) {
            var t, n = pe(e, this),
                i = n.length;
            return this.filter(function () {
                for (t = 0; t < i; t++)
                    if (pe.contains(this, n[t])) return !0
            })
        },
        closest: function (e, t) {
            for (var n, i = 0, o = this.length, a = [], s = we.test(e) || "string" != typeof e ? pe(e, t || this.context) : 0; i < o; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
                        a.push(n);
                        break
                    }
            return this.pushStack(1 < a.length ? pe.uniqueSort(a) : a)
        },
        index: function (e) {
            return e ? "string" == typeof e ? pe.inArray(this[0], pe(e)) : pe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), pe.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function (e) {
            return be(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
            return be(e, "parentNode", n)
        },
        next: function (e) {
            return n(e, "nextSibling")
        },
        prev: function (e) {
            return n(e, "previousSibling")
        },
        nextAll: function (e) {
            return be(e, "nextSibling")
        },
        prevAll: function (e) {
            return be(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
            return be(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
            return be(e, "previousSibling", n)
        },
        siblings: function (e) {
            return _e((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return _e(e.firstChild)
        },
        contents: function (e) {
            return pe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : pe.merge([], e.childNodes)
        }
    }, function (i, o) {
        pe.fn[i] = function (e, t) {
            var n = pe.map(this, o, e);
            return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = pe.filter(t, n)), 1 < this.length && (Me[i] || (n = pe.uniqueSort(n)), Te.test(i) && (n = n.reverse())), this.pushStack(n)
        }
    });
    var Se, Le, De = /\S+/g;
    for (Le in pe.Callbacks = function (i) {
        i = "string" == typeof i ? d(i) : pe.extend({}, i);
        var o, e, t, n, a = [],
            s = [],
            r = -1,
            l = function () {
                for (n = i.once, t = o = !0; s.length; r = -1)
                    for (e = s.shift(); ++r < a.length;) !1 === a[r].apply(e[0], e[1]) && i.stopOnFalse && (r = a.length, e = !1);
                i.memory || (e = !1), o = !1, n && (a = e ? [] : "")
            },
            u = {
                add: function () {
                    return a && (e && !o && (r = a.length - 1, s.push(e)), function n(e) {
                        pe.each(e, function (e, t) {
                            pe.isFunction(t) ? i.unique && u.has(t) || a.push(t) : t && t.length && "string" !== pe.type(t) && n(t)
                        })
                    }(arguments), e && !o && l()), this
                },
                remove: function () {
                    return pe.each(arguments, function (e, t) {
                        for (var n; - 1 < (n = pe.inArray(t, a, n));) a.splice(n, 1), n <= r && r--
                    }), this
                },
                has: function (e) {
                    return e ? -1 < pe.inArray(e, a) : 0 < a.length
                },
                empty: function () {
                    return a && (a = []), this
                },
                disable: function () {
                    return n = s = [], a = e = "", this
                },
                disabled: function () {
                    return !a
                },
                lock: function () {
                    return n = !0, e || u.disable(), this
                },
                locked: function () {
                    return !!n
                },
                fireWith: function (e, t) {
                    return n || (t = [e, (t = t || []).slice ? t.slice() : t], s.push(t), o || l()), this
                },
                fire: function () {
                    return u.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!t
                }
            };
        return u
    }, pe.extend({
        Deferred: function (e) {
            var a = [
                ["resolve", "done", pe.Callbacks("once memory"), "resolved"],
                ["reject", "fail", pe.Callbacks("once memory"), "rejected"],
                ["notify", "progress", pe.Callbacks("memory")]
            ],
                o = "pending",
                s = {
                    state: function () {
                        return o
                    },
                    always: function () {
                        return r.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var o = arguments;
                        return pe.Deferred(function (i) {
                            pe.each(a, function (e, t) {
                                var n = pe.isFunction(o[e]) && o[e];
                                r[t[1]](function () {
                                    var e = n && n.apply(this, arguments);
                                    e && pe.isFunction(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this === s ? i.promise() : this, n ? [e] : arguments)
                                })
                            }), o = null
                        }).promise()
                    },
                    promise: function (e) {
                        return null != e ? pe.extend(e, s) : s
                    }
                },
                r = {};
            return s.pipe = s.then, pe.each(a, function (e, t) {
                var n = t[2],
                    i = t[3];
                s[t[1]] = n.add, i && n.add(function () {
                    o = i
                }, a[1 ^ e][2].disable, a[2][2].lock), r[t[0]] = function () {
                    return r[t[0] + "With"](this === r ? s : this, arguments), this
                }, r[t[0] + "With"] = n.fireWith
            }), s.promise(r), e && e.call(r, r), r
        },
        when: function (e) {
            var o, t, n, i = 0,
                a = oe.call(arguments),
                s = a.length,
                r = 1 !== s || e && pe.isFunction(e.promise) ? s : 0,
                l = 1 === r ? e : pe.Deferred(),
                u = function (t, n, i) {
                    return function (e) {
                        n[t] = this, i[t] = 1 < arguments.length ? oe.call(arguments) : e, i === o ? l.notifyWith(n, i) : --r || l.resolveWith(n, i)
                    }
                };
            if (1 < s)
                for (o = new Array(s), t = new Array(s), n = new Array(s); i < s; i++) a[i] && pe.isFunction(a[i].promise) ? a[i].promise().progress(u(i, t, o)).done(u(i, n, a)).fail(l.reject) : --r;
            return r || l.resolveWith(n, a), l.promise()
        }
    }), pe.fn.ready = function (e) {
        return pe.ready.promise().done(e), this
    }, pe.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
            e ? pe.readyWait++ : pe.ready(!0)
        },
        ready: function (e) {
            (!0 === e ? --pe.readyWait : pe.isReady) || (pe.isReady = !0) !== e && 0 < --pe.readyWait || (Se.resolveWith(ie, [pe]), pe.fn.triggerHandler && (pe(ie).triggerHandler("ready"), pe(ie).off("ready")))
        }
    }), pe.ready.promise = function (t) {
        if (!Se)
            if (Se = pe.Deferred(), "complete" === ie.readyState || "loading" !== ie.readyState && !ie.documentElement.doScroll) C.setTimeout(pe.ready);
            else if (ie.addEventListener) ie.addEventListener("DOMContentLoaded", a), C.addEventListener("load", a);
            else {
                ie.attachEvent("onreadystatechange", a), C.attachEvent("onload", a);
                var n = !1;
                try {
                    n = null == C.frameElement && ie.documentElement
                } catch (i) { }
                n && n.doScroll && function e() {
                    if (!pe.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (i) {
                            return C.setTimeout(e, 50)
                        }
                        o(), pe.ready()
                    }
                }()
            }
        return Se.promise(t)
    }, pe.ready.promise(), pe(ce)) break;
    ce.ownFirst = "0" === Le, ce.inlineBlockNeedsLayout = !1, pe(function () {
        var e, t, n, i;
        (n = ie.getElementsByTagName("body")[0]) && n.style && (t = ie.createElement("div"), (i = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ce.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
    }),
        function () {
            var e = ie.createElement("div");
            ce.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                ce.deleteExpando = !1
            }
            e = null
        }();
    var Oe, $e = function (e) {
        var t = pe.noData[(e.nodeName + " ").toLowerCase()],
            n = +e.nodeType || 1;
        return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
    },
        Ae = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Be = /([A-Z])/g;
    pe.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function (e) {
            return !!(e = e.nodeType ? pe.cache[e[pe.expando]] : e[pe.expando]) && !u(e)
        },
        data: function (e, t, n) {
            return i(e, t, n)
        },
        removeData: function (e, t) {
            return s(e, t)
        },
        _data: function (e, t, n) {
            return i(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return s(e, t, !0)
        }
    }), pe.fn.extend({
        data: function (e, t) {
            var n, i, o, a = this[0],
                s = a && a.attributes;
            if (e === undefined) {
                if (this.length && (o = pe.data(a), 1 === a.nodeType && !pe._data(a, "parsedAttrs"))) {
                    for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && l(a, i = pe.camelCase(i.slice(5)), o[i]);
                    pe._data(a, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function () {
                pe.data(this, e)
            }) : 1 < arguments.length ? this.each(function () {
                pe.data(this, e, t)
            }) : a ? l(a, e, pe.data(a, e)) : undefined
        },
        removeData: function (e) {
            return this.each(function () {
                pe.removeData(this, e)
            })
        }
    }), pe.extend({
        queue: function (e, t, n) {
            var i;
            if (e) return t = (t || "fx") + "queue", i = pe._data(e, t), n && (!i || pe.isArray(n) ? i = pe._data(e, t, pe.makeArray(n)) : i.push(n)), i || []
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = pe.queue(e, t),
                i = n.length,
                o = n.shift(),
                a = pe._queueHooks(e, t),
                s = function () {
                    pe.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete a.stop, o.call(e, s, a)), !i && a && a.empty.fire()
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return pe._data(e, n) || pe._data(e, n, {
                empty: pe.Callbacks("once memory").add(function () {
                    pe._removeData(e, t + "queue"), pe._removeData(e, n)
                })
            })
        }
    }), pe.fn.extend({
        queue: function (t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? pe.queue(this[0], t) : n === undefined ? this : this.each(function () {
                var e = pe.queue(this, t, n);
                pe._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && pe.dequeue(this, t)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                pe.dequeue(this, e)
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, t) {
            var n, i = 1,
                o = pe.Deferred(),
                a = this,
                s = this.length,
                r = function () {
                    --i || o.resolveWith(a, [a])
                };
            for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; s--;)(n = pe._data(a[s], e + "queueHooks")) && n.empty && (i++ , n.empty.add(r));
            return r(), o.promise(t)
        }
    }), ce.shrinkWrapBlocks = function () {
        return null != Oe ? Oe : (Oe = !1, (t = ie.getElementsByTagName("body")[0]) && t.style ? (e = ie.createElement("div"), (n = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", t.appendChild(n).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(ie.createElement("div")).style.width = "5px", Oe = 3 !== e.offsetWidth), t.removeChild(n), Oe) : void 0);
        var e, t, n
    };
    var Ie, Re, Pe, Ne = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        He = new RegExp("^(?:([+-])=|)(" + Ne + ")([a-z%]*)$", "i"),
        Fe = ["Top", "Right", "Bottom", "Left"],
        je = function (e, t) {
            return e = t || e, "none" === pe.css(e, "display") || !pe.contains(e.ownerDocument, e)
        },
        We = function (e, t, n, i, o, a, s) {
            var r = 0,
                l = e.length,
                u = null == n;
            if ("object" === pe.type(n))
                for (r in o = !0, n) We(e, t, r, n[r], !0, a, s);
            else if (i !== undefined && (o = !0, pe.isFunction(i) || (s = !0), u && (s ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                return u.call(pe(e), n)
            })), t))
                for (; r < l; r++) t(e[r], n, s ? i : i.call(e[r], r, t(e[r], n)));
            return o ? e : u ? t.call(e) : l ? t(e[0], n) : a
        },
        qe = /^(?:checkbox|radio)$/i,
        ze = /<([\w:-]+)/,
        Xe = /^$|\/(?:java|ecma)script/i,
        Ve = /^\s+/,
        Ye = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    Ie = ie.createElement("div"), Re = ie.createDocumentFragment(), Pe = ie.createElement("input"), Ie.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ce.leadingWhitespace = 3 === Ie.firstChild.nodeType, ce.tbody = !Ie.getElementsByTagName("tbody").length, ce.htmlSerialize = !!Ie.getElementsByTagName("link").length, ce.html5Clone = "<:nav></:nav>" !== ie.createElement("nav").cloneNode(!0).outerHTML, Pe.type = "checkbox", Pe.checked = !0, Re.appendChild(Pe), ce.appendChecked = Pe.checked, Ie.innerHTML = "<textarea>x</textarea>", ce.noCloneChecked = !!Ie.cloneNode(!0).lastChild.defaultValue, Re.appendChild(Ie), (Pe = ie.createElement("input")).setAttribute("type", "radio"), Pe.setAttribute("checked", "checked"), Pe.setAttribute("name", "t"), Ie.appendChild(Pe), ce.checkClone = Ie.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.noCloneEvent = !!Ie.addEventListener, Ie[pe.expando] = 1, ce.attributes = !Ie.getAttribute(pe.expando);
    var Ue = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ce.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Ue.optgroup = Ue.option, Ue.tbody = Ue.tfoot = Ue.colgroup = Ue.caption = Ue.thead, Ue.th = Ue.td;
    var Ke = /<|&#?\w+;/,
        Ze = /<tbody/i;
    ! function () {
        var e, t, n = ie.createElement("div");
        for (e in {
            submit: !0,
            change: !0,
            focusin: !0
        }) t = "on" + e, (ce[e] = t in C) || (n.setAttribute(t, "t"), ce[e] = !1 === n.attributes[t].expando);
        n = null
    }();
    var Qe = /^(?:input|select|textarea)$/i,
        Ge = /^key/,
        Je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        et = /^(?:focusinfocus|focusoutblur)$/,
        tt = /^([^.]*)(?:\.(.+)|)/;
    pe.event = {
        global: {},
        add: function (e, t, n, i, o) {
            var a, s, r, l, u, d, c, h, p, f, m, v = pe._data(e);
            if (v) {
                for (n.handler && (n = (l = n).handler, o = l.selector), n.guid || (n.guid = pe.guid++), (s = v.events) || (s = v.events = {}), (d = v.handle) || ((d = v.handle = function (e) {
                    return void 0 === pe || e && pe.event.triggered === e.type ? undefined : pe.event.dispatch.apply(d.elem, arguments)
                }).elem = e), r = (t = (t || "").match(De) || [""]).length; r--;) p = m = (a = tt.exec(t[r]) || [])[1], f = (a[2] || "").split(".").sort(), p && (u = pe.event.special[p] || {}, p = (o ? u.delegateType : u.bindType) || p, u = pe.event.special[p] || {}, c = pe.extend({
                    type: p,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && pe.expr.match.needsContext.test(o),
                    namespace: f.join(".")
                }, l), (h = s[p]) || ((h = s[p] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, f, d) || (e.addEventListener ? e.addEventListener(p, d, !1) : e.attachEvent && e.attachEvent("on" + p, d))), u.add && (u.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, c) : h.push(c), pe.event.global[p] = !0);
                e = null
            }
        },
        remove: function (e, t, n, i, o) {
            var a, s, r, l, u, d, c, h, p, f, m, v = pe.hasData(e) && pe._data(e);
            if (v && (d = v.events)) {
                for (u = (t = (t || "").match(De) || [""]).length; u--;)
                    if (p = m = (r = tt.exec(t[u]) || [])[1], f = (r[2] || "").split(".").sort(), p) {
                        for (c = pe.event.special[p] || {}, h = d[p = (i ? c.delegateType : c.bindType) || p] || [], r = r[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = a = h.length; a--;) s = h[a], !o && m !== s.origType || n && n.guid !== s.guid || r && !r.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (h.splice(a, 1), s.selector && h.delegateCount-- , c.remove && c.remove.call(e, s));
                        l && !h.length && (c.teardown && !1 !== c.teardown.call(e, f, v.handle) || pe.removeEvent(e, p, v.handle), delete d[p])
                    } else
                        for (p in d) pe.event.remove(e, p + t[u], n, i, !0);
                pe.isEmptyObject(d) && (delete v.handle, pe._removeData(e, "events"))
            }
        },
        trigger: function (e, t, n, i) {
            var o, a, s, r, l, u, d, c = [n || ie],
                h = de.call(e, "type") ? e.type : e,
                p = de.call(e, "namespace") ? e.namespace.split(".") : [];
            if (s = u = n = n || ie, 3 !== n.nodeType && 8 !== n.nodeType && !et.test(h + pe.event.triggered) && (-1 < h.indexOf(".") && (h = (p = h.split(".")).shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, (e = e[pe.expando] ? e : new pe.Event(h, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = null == t ? [e] : pe.makeArray(t, [e]), l = pe.event.special[h] || {}, i || !l.trigger || !1 !== l.trigger.apply(n, t))) {
                if (!i && !l.noBubble && !pe.isWindow(n)) {
                    for (r = l.delegateType || h, et.test(r + h) || (s = s.parentNode); s; s = s.parentNode) c.push(s), u = s;
                    u === (n.ownerDocument || ie) && c.push(u.defaultView || u.parentWindow || C)
                }
                for (d = 0;
                    (s = c[d++]) && !e.isPropagationStopped();) e.type = 1 < d ? r : l.bindType || h, (o = (pe._data(s, "events") || {})[e.type] && pe._data(s, "handle")) && o.apply(s, t), (o = a && s[a]) && o.apply && $e(s) && (e.result = o.apply(s, t), !1 === e.result && e.preventDefault());
                if (e.type = h, !i && !e.isDefaultPrevented() && (!l._default || !1 === l._default.apply(c.pop(), t)) && $e(n) && a && n[h] && !pe.isWindow(n)) {
                    (u = n[a]) && (n[a] = null), pe.event.triggered = h;
                    try {
                        n[h]()
                    } catch (f) { }
                    pe.event.triggered = undefined, u && (n[a] = u)
                }
                return e.result
            }
        },
        dispatch: function (e) {
            e = pe.event.fix(e);
            var t, n, i, o, a, s = [],
                r = oe.call(arguments),
                l = (pe._data(this, "events") || {})[e.type] || [],
                u = pe.event.special[e.type] || {};
            if ((r[0] = e).delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                for (s = pe.event.handlers.call(this, e, l), t = 0;
                    (o = s[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = o.elem, n = 0;
                        (a = o.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(a.namespace) || (e.handleObj = a, e.data = a.data, (i = ((pe.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, r)) !== undefined && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, i, o, a, s = [],
                r = t.delegateCount,
                l = e.target;
            if (r && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                        for (i = [], n = 0; n < r; n++) i[o = (a = t[n]).selector + " "] === undefined && (i[o] = a.needsContext ? -1 < pe(o, this).index(l) : pe.find(o, this, null, [l]).length), i[o] && i.push(a);
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return r < t.length && s.push({
                elem: this,
                handlers: t.slice(r)
            }), s
        },
        fix: function (e) {
            if (e[pe.expando]) return e;
            var t, n, i, o = e.type,
                a = e,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Je.test(o) ? this.mouseHooks : Ge.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new pe.Event(a), t = i.length; t--;) e[n = i[t]] = a[n];
            return e.target || (e.target = a.srcElement || ie), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, i, o, a = t.button,
                    s = t.fromElement;
                return null == e.pageX && null != t.clientX && (o = (i = e.target.ownerDocument || ie).documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || a === undefined || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== f() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) { }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === f() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    if (pe.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                },
                _default: function (e) {
                    return pe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n) {
            var i = pe.extend(new pe.Event, n, {
                type: e,
                isSimulated: !0
            });
            pe.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
        }
    }, pe.removeEvent = ie.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    } : function (e, t, n) {
        var i = "on" + t;
        e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n))
    }, pe.Event = function (e, t) {
        if (!(this instanceof pe.Event)) return new pe.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? h : p) : this.type = e, t && pe.extend(this, t), this.timeStamp = e && e.timeStamp || pe.now(), this[pe.expando] = !0
    }, pe.Event.prototype = {
        constructor: pe.Event,
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = h, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = h, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = h, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, pe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, a) {
        pe.event.special[e] = {
            delegateType: a,
            bindType: a,
            handle: function (e) {
                var t, n = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return i && (i === n || pe.contains(n, i)) || (e.type = o.origType, t = o.handler.apply(this, arguments), e.type = a), t
            }
        }
    }), ce.submit || (pe.event.special.submit = {
        setup: function () {
            if (pe.nodeName(this, "form")) return !1;
            pe.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target,
                    n = pe.nodeName(t, "input") || pe.nodeName(t, "button") ? pe.prop(t, "form") : undefined;
                n && !pe._data(n, "submit") && (pe.event.add(n, "submit._submit", function (e) {
                    e._submitBubble = !0
                }), pe._data(n, "submit", !0))
            })
        },
        postDispatch: function (e) {
            e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && pe.event.simulate("submit", this.parentNode, e))
        },
        teardown: function () {
            if (pe.nodeName(this, "form")) return !1;
            pe.event.remove(this, "._submit")
        }
    }), ce.change || (pe.event.special.change = {
        setup: function () {
            if (Qe.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (pe.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
            }), pe.event.add(this, "click._change", function (e) {
                this._justChanged && !e.isTrigger && (this._justChanged = !1), pe.event.simulate("change", this, e)
            })), !1;
            pe.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Qe.test(t.nodeName) && !pe._data(t, "change") && (pe.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || pe.event.simulate("change", this.parentNode, e)
                }), pe._data(t, "change", !0))
            })
        },
        handle: function (e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            return pe.event.remove(this, "._change"), !Qe.test(this.nodeName)
        }
    }), ce.focusin || pe.each({
        focus: "focusin",
        blur: "focusout"
    }, function (n, i) {
        var o = function (e) {
            pe.event.simulate(i, e.target, pe.event.fix(e))
        };
        pe.event.special[i] = {
            setup: function () {
                var e = this.ownerDocument || this,
                    t = pe._data(e, i);
                t || e.addEventListener(n, o, !0), pe._data(e, i, (t || 0) + 1)
            },
            teardown: function () {
                var e = this.ownerDocument || this,
                    t = pe._data(e, i) - 1;
                t ? pe._data(e, i, t) : (e.removeEventListener(n, o, !0), pe._removeData(e, i))
            }
        }
    }), pe.fn.extend({
        on: function (e, t, n, i) {
            return _(this, e, t, n, i)
        },
        one: function (e, t, n, i) {
            return _(this, e, t, n, i, 1)
        },
        off: function (e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, pe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = undefined), !1 === n && (n = p), this.each(function () {
                pe.event.remove(this, e, n, t)
            })
        },
        trigger: function (e, t) {
            return this.each(function () {
                pe.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return pe.event.trigger(e, t, n, !0)
        }
    });
    var nt = / jQuery\d+="(?:null|\d+)"/g,
        it = new RegExp("<(?:" + Ye + ")[\\s/>]", "i"),
        ot = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        at = /<script|<style|<link/i,
        st = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rt = /^true\/(.*)/,
        lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ut = v(ie).appendChild(ie.createElement("div"));
    pe.extend({
        htmlPrefilter: function (e) {
            return e.replace(ot, "<$1></$2>")
        },
        clone: function (e, t, n) {
            var i, o, a, s, r, l = pe.contains(e.ownerDocument, e);
            if (ce.html5Clone || pe.isXMLDoc(e) || !it.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (ut.innerHTML = e.outerHTML, ut.removeChild(a = ut.firstChild)), !(ce.noCloneEvent && ce.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e)))
                for (i = g(a), r = g(e), s = 0; null != (o = r[s]); ++s) i[s] && T(o, i[s]);
            if (t)
                if (n)
                    for (r = r || g(e), i = i || g(a), s = 0; null != (o = r[s]); s++) E(o, i[s]);
                else E(e, a);
            return 0 < (i = g(a, "script")).length && y(i, !l && g(e, "script")), i = r = o = null, a
        },
        cleanData: function (e, t) {
            for (var n, i, o, a, s = 0, r = pe.expando, l = pe.cache, u = ce.attributes, d = pe.event.special; null != (n = e[s]); s++)
                if ((t || $e(n)) && (a = (o = n[r]) && l[o])) {
                    if (a.events)
                        for (i in a.events) d[i] ? pe.event.remove(n, i) : pe.removeEvent(n, i, a.handle);
                    l[o] && (delete l[o], u || "undefined" == typeof n.removeAttribute ? n[r] = undefined : n.removeAttribute(r), ne.push(o))
                }
        }
    }), pe.fn.extend({
        domManip: M,
        detach: function (e) {
            return S(this, e, !0)
        },
        remove: function (e) {
            return S(this, e)
        },
        text: function (e) {
            return We(this, function (e) {
                return e === undefined ? pe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ie).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function () {
            return M(this, arguments, function (e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || w(this, e).appendChild(e)
            })
        },
        prepend: function () {
            return M(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = w(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function () {
            return M(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function () {
            return M(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && pe.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && pe.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return pe.clone(this, e, t)
            })
        },
        html: function (e) {
            return We(this, function (e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (e === undefined) return 1 === t.nodeType ? t.innerHTML.replace(nt, "") : undefined;
                if ("string" == typeof e && !at.test(e) && (ce.htmlSerialize || !it.test(e)) && (ce.leadingWhitespace || !Ve.test(e)) && !Ue[(ze.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = pe.htmlPrefilter(e);
                    try {
                        for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (pe.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (o) { }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function () {
            var n = [];
            return M(this, arguments, function (e) {
                var t = this.parentNode;
                pe.inArray(this, n) < 0 && (pe.cleanData(g(this)), t && t.replaceChild(e, this))
            }, n)
        }
    }), pe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, s) {
        pe.fn[e] = function (e) {
            for (var t, n = 0, i = [], o = pe(e), a = o.length - 1; n <= a; n++) t = n === a ? this : this.clone(!0), pe(o[n])[s](t), se.apply(i, t.get());
            return this.pushStack(i)
        }
    });
    var dt, ct = {
        HTML: "block",
        BODY: "block"
    },
        ht = /^margin/,
        pt = new RegExp("^(" + Ne + ")(?!px)[a-z%]+$", "i"),
        ft = function (e, t, n, i) {
            var o, a, s = {};
            for (a in t) s[a] = e.style[a], e.style[a] = t[a];
            for (a in o = n.apply(e, i || []), t) e.style[a] = s[a];
            return o
        },
        mt = ie.documentElement;
    ! function () {
        function e() {
            var e, t, n = ie.documentElement;
            n.appendChild(u), d.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i = a = l = !1, o = r = !0, C.getComputedStyle && (t = C.getComputedStyle(d), i = "1%" !== (t || {}).top, l = "2px" === (t || {}).marginLeft, a = "4px" === (t || {
                width: "4px"
            }).width, d.style.marginRight = "50%", o = "4px" === (t || {
                marginRight: "4px"
            }).marginRight, (e = d.appendChild(ie.createElement("div"))).style.cssText = d.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", d.style.width = "1px", r = !parseFloat((C.getComputedStyle(e) || {}).marginRight), d.removeChild(e)), d.style.display = "none", (s = 0 === d.getClientRects().length) && (d.style.display = "", d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", d.childNodes[0].style.borderCollapse = "separate", (e = d.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (s = 0 === e[0].offsetHeight) && (e[0].style.display = "", e[1].style.display = "none", s = 0 === e[0].offsetHeight)), n.removeChild(u)
        }
        var i, o, a, s, r, l, u = ie.createElement("div"),
            d = ie.createElement("div");
        d.style && (d.style.cssText = "float:left;opacity:.5", ce.opacity = "0.5" === d.style.opacity, ce.cssFloat = !!d.style.cssFloat, d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", ce.clearCloneStyle = "content-box" === d.style.backgroundClip, (u = ie.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", d.innerHTML = "", u.appendChild(d), ce.boxSizing = "" === d.style.boxSizing || "" === d.style.MozBoxSizing || "" === d.style.WebkitBoxSizing, pe.extend(ce, {
            reliableHiddenOffsets: function () {
                return null == i && e(), s
            },
            boxSizingReliable: function () {
                return null == i && e(), a
            },
            pixelMarginRight: function () {
                return null == i && e(), o
            },
            pixelPosition: function () {
                return null == i && e(), i
            },
            reliableMarginRight: function () {
                return null == i && e(), r
            },
            reliableMarginLeft: function () {
                return null == i && e(), l
            }
        }))
    }();
    var vt, gt, yt = /^(top|right|bottom|left)$/;
    C.getComputedStyle ? (vt = function (e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = C), t.getComputedStyle(e)
    }, gt = function (e, t, n) {
        var i, o, a, s, r = e.style;
        return "" !== (s = (n = n || vt(e)) ? n.getPropertyValue(t) || n[t] : undefined) && s !== undefined || pe.contains(e.ownerDocument, e) || (s = pe.style(e, t)), n && !ce.pixelMarginRight() && pt.test(s) && ht.test(t) && (i = r.width, o = r.minWidth, a = r.maxWidth, r.minWidth = r.maxWidth = r.width = s, s = n.width, r.width = i, r.minWidth = o, r.maxWidth = a), s === undefined ? s : s + ""
    }) : mt.currentStyle && (vt = function (e) {
        return e.currentStyle
    }, gt = function (e, t, n) {
        var i, o, a, s, r = e.style;
        return null == (s = (n = n || vt(e)) ? n[t] : undefined) && r && r[t] && (s = r[t]), pt.test(s) && !yt.test(t) && (i = r.left, (a = (o = e.runtimeStyle) && o.left) && (o.left = e.currentStyle.left), r.left = "fontSize" === t ? "1em" : s, s = r.pixelLeft + "px", r.left = i, a && (o.left = a)), s === undefined ? s : s + "" || "auto"
    });
    var bt = /alpha\([^)]*\)/i,
        _t = /opacity\s*=\s*([^)]*)/i,
        wt = /^(none|table(?!-c[ea]).+)/,
        xt = new RegExp("^(" + Ne + ")(.*)$", "i"),
        Ct = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        kt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Et = ["Webkit", "O", "Moz", "ms"],
        Tt = ie.createElement("div").style;
    pe.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = gt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ce.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, a, s, r = pe.camelCase(t),
                    l = e.style;
                if (t = pe.cssProps[r] || (pe.cssProps[r] = $(r) || r), s = pe.cssHooks[t] || pe.cssHooks[r], n === undefined) return s && "get" in s && (o = s.get(e, !1, i)) !== undefined ? o : l[t];
                if ("string" === (a = typeof n) && (o = He.exec(n)) && o[1] && (n = c(e, t, o), a = "number"), null != n && n == n && ("number" === a && (n += o && o[3] || (pe.cssNumber[r] ? "" : "px")), ce.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && (n = s.set(e, n, i)) === undefined))) try {
                    l[t] = n
                } catch (u) { }
            }
        },
        css: function (e, t, n, i) {
            var o, a, s, r = pe.camelCase(t);
            return t = pe.cssProps[r] || (pe.cssProps[r] = $(r) || r), (s = pe.cssHooks[t] || pe.cssHooks[r]) && "get" in s && (a = s.get(e, !0, n)), a === undefined && (a = gt(e, t, i)), "normal" === a && t in kt && (a = kt[t]), "" === n || n ? (o = parseFloat(a), !0 === n || isFinite(o) ? o || 0 : a) : a
        }
    }), pe.each(["height", "width"], function (e, o) {
        pe.cssHooks[o] = {
            get: function (e, t, n) {
                if (t) return wt.test(pe.css(e, "display")) && 0 === e.offsetWidth ? ft(e, Ct, function () {
                    return R(e, o, n)
                }) : R(e, o, n)
            },
            set: function (e, t, n) {
                var i = n && vt(e);
                return B(e, t, n ? I(e, o, n, ce.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), ce.opacity || (pe.cssHooks.opacity = {
        get: function (e, t) {
            return _t.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function (e, t) {
            var n = e.style,
                i = e.currentStyle,
                o = pe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                a = i && i.filter || n.filter || "";
            ((n.zoom = 1) <= t || "" === t) && "" === pe.trim(a.replace(bt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = bt.test(a) ? a.replace(bt, o) : a + " " + o)
        }
    }), pe.cssHooks.marginRight = O(ce.reliableMarginRight, function (e, t) {
        if (t) return ft(e, {
            display: "inline-block"
        }, gt, [e, "marginRight"])
    }), pe.cssHooks.marginLeft = O(ce.reliableMarginLeft, function (e, t) {
        if (t) return (parseFloat(gt(e, "marginLeft")) || (pe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ft(e, {
            marginLeft: 0
        }, function () {
            return e.getBoundingClientRect().left
        }) : 0)) + "px"
    }), pe.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (o, a) {
        pe.cssHooks[o + a] = {
            expand: function (e) {
                for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[o + Fe[t] + a] = i[t] || i[t - 2] || i[0];
                return n
            }
        }, ht.test(o) || (pe.cssHooks[o + a].set = B)
    }), pe.fn.extend({
        css: function (e, t) {
            return We(this, function (e, t, n) {
                var i, o, a = {},
                    s = 0;
                if (pe.isArray(t)) {
                    for (i = vt(e), o = t.length; s < o; s++) a[t[s]] = pe.css(e, t[s], !1, i);
                    return a
                }
                return n !== undefined ? pe.style(e, t, n) : pe.css(e, t)
            }, e, t, 1 < arguments.length)
        },
        show: function () {
            return A(this, !0)
        },
        hide: function () {
            return A(this)
        },
        toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                je(this) ? pe(this).show() : pe(this).hide()
            })
        }
    }), (pe.Tween = P).prototype = {
        constructor: P,
        init: function (e, t, n, i, o, a) {
            this.elem = e, this.prop = n, this.easing = o || pe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = a || (pe.cssNumber[n] ? "" : "px")
        },
        cur: function () {
            var e = P.propHooks[this.prop];
            return e && e.get ? e.get(this) : P.propHooks._default.get(this)
        },
        run: function (e) {
            var t, n = P.propHooks[this.prop];
            return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : P.propHooks._default.set(this), this
        }
    }, P.prototype.init.prototype = P.prototype, P.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function (e) {
                pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, P.propHooks.scrollTop = P.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, pe.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, pe.fx = P.prototype.init, pe.fx.step = {};
    var Mt, St, Lt, Dt, Ot, $t, At, Bt = /^(?:toggle|show|hide)$/,
        It = /queueHooks$/;
    pe.Animation = pe.extend(q, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return c(n.elem, e, He.exec(t), n), n
            }]
        },
        tweener: function (e, t) {
            pe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(De);
            for (var n, i = 0, o = e.length; i < o; i++) n = e[i], q.tweeners[n] = q.tweeners[n] || [], q.tweeners[n].unshift(t)
        },
        prefilters: [j],
        prefilter: function (e, t) {
            t ? q.prefilters.unshift(e) : q.prefilters.push(e)
        }
    }), pe.speed = function (e, t, n) {
        var i = e && "object" == typeof e ? pe.extend({}, e) : {
            complete: n || !n && t || pe.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !pe.isFunction(t) && t
        };
        return i.duration = pe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in pe.fx.speeds ? pe.fx.speeds[i.duration] : pe.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            pe.isFunction(i.old) && i.old.call(this), i.queue && pe.dequeue(this, i.queue)
        }, i
    }, pe.fn.extend({
        fadeTo: function (e, t, n, i) {
            return this.filter(je).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i)
        },
        animate: function (t, e, n, i) {
            var o = pe.isEmptyObject(t),
                a = pe.speed(e, n, i),
                s = function () {
                    var e = q(this, pe.extend({}, t), a);
                    (o || pe._data(this, "finish")) && e.stop(!0)
                };
            return s.finish = s, o || !1 === a.queue ? this.each(s) : this.queue(a.queue, s)
        },
        stop: function (o, e, a) {
            var s = function (e) {
                var t = e.stop;
                delete e.stop, t(a)
            };
            return "string" != typeof o && (a = e, e = o, o = undefined), e && !1 !== o && this.queue(o || "fx", []), this.each(function () {
                var e = !0,
                    t = null != o && o + "queueHooks",
                    n = pe.timers,
                    i = pe._data(this);
                if (t) i[t] && i[t].stop && s(i[t]);
                else
                    for (t in i) i[t] && i[t].stop && It.test(t) && s(i[t]);
                for (t = n.length; t--;) n[t].elem !== this || null != o && n[t].queue !== o || (n[t].anim.stop(a), e = !1, n.splice(t, 1));
                !e && a || pe.dequeue(this, o)
            })
        },
        finish: function (s) {
            return !1 !== s && (s = s || "fx"), this.each(function () {
                var e, t = pe._data(this),
                    n = t[s + "queue"],
                    i = t[s + "queueHooks"],
                    o = pe.timers,
                    a = n ? n.length : 0;
                for (t.finish = !0, pe.queue(this, s, []), i && i.stop && i.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; e < a; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), pe.each(["toggle", "show", "hide"], function (e, i) {
        var o = pe.fn[i];
        pe.fn[i] = function (e, t, n) {
            return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(H(i, !0), e, t, n)
        }
    }), pe.each({
        slideDown: H("show"),
        slideUp: H("hide"),
        slideToggle: H("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, i) {
        pe.fn[e] = function (e, t, n) {
            return this.animate(i, e, t, n)
        }
    }), pe.timers = [], pe.fx.tick = function () {
        var e, t = pe.timers,
            n = 0;
        for (Mt = pe.now(); n < t.length; n++)(e = t[n])() || t[n] !== e || t.splice(n--, 1);
        t.length || pe.fx.stop(), Mt = undefined
    }, pe.fx.timer = function (e) {
        pe.timers.push(e), e() ? pe.fx.start() : pe.timers.pop()
    }, pe.fx.interval = 13, pe.fx.start = function () {
        St || (St = C.setInterval(pe.fx.tick, pe.fx.interval))
    }, pe.fx.stop = function () {
        C.clearInterval(St), St = null
    }, pe.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, pe.fn.delay = function (i, e) {
        return i = pe.fx && pe.fx.speeds[i] || i, e = e || "fx", this.queue(e, function (e, t) {
            var n = C.setTimeout(e, i);
            t.stop = function () {
                C.clearTimeout(n)
            }
        })
    }, Dt = ie.createElement("input"), Ot = ie.createElement("div"), $t = ie.createElement("select"), At = $t.appendChild(ie.createElement("option")), (Ot = ie.createElement("div")).setAttribute("className", "t"), Ot.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", Lt = Ot.getElementsByTagName("a")[0], Dt.setAttribute("type", "checkbox"), Ot.appendChild(Dt), (Lt = Ot.getElementsByTagName("a")[0]).style.cssText = "top:1px", ce.getSetAttribute = "t" !== Ot.className, ce.style = /top/.test(Lt.getAttribute("style")), ce.hrefNormalized = "/a" === Lt.getAttribute("href"), ce.checkOn = !!Dt.value, ce.optSelected = At.selected, ce.enctype = !!ie.createElement("form").enctype, $t.disabled = !0, ce.optDisabled = !At.disabled, (Dt = ie.createElement("input")).setAttribute("value", ""), ce.input = "" === Dt.getAttribute("value"), Dt.value = "t", Dt.setAttribute("type", "radio"), ce.radioValue = "t" === Dt.value;
    var Rt = /\r/g,
        Pt = /[\x20\t\r\n\f]+/g;
    pe.fn.extend({
        val: function (n) {
            var i, e, o, t = this[0];
            return arguments.length ? (o = pe.isFunction(n), this.each(function (e) {
                var t;
                1 === this.nodeType && (null == (t = o ? n.call(this, e, pe(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : pe.isArray(t) && (t = pe.map(t, function (e) {
                    return null == e ? "" : e + ""
                })), (i = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()]) && "set" in i && i.set(this, t, "value") !== undefined || (this.value = t))
            })) : t ? (i = pe.valHooks[t.type] || pe.valHooks[t.nodeName.toLowerCase()]) && "get" in i && (e = i.get(t, "value")) !== undefined ? e : "string" == typeof (e = t.value) ? e.replace(Rt, "") : null == e ? "" : e : void 0
        }
    }), pe.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = pe.find.attr(e, "value");
                    return null != t ? t : pe.trim(pe.text(e)).replace(Pt, " ")
                }
            },
            select: {
                get: function (e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, a = "select-one" === e.type || o < 0, s = a ? null : [], r = a ? o + 1 : i.length, l = o < 0 ? r : a ? o : 0; l < r; l++)
                        if (((n = i[l]).selected || l === o) && (ce.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
                            if (t = pe(n).val(), a) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function (e, t) {
                    for (var n, i, o = e.options, a = pe.makeArray(t), s = o.length; s--;)
                        if (i = o[s], -1 < pe.inArray(pe.valHooks.option.get(i), a)) try {
                            i.selected = n = !0
                        } catch (r) {
                            i.scrollHeight
                        } else i.selected = !1;
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), pe.each(["radio", "checkbox"], function () {
        pe.valHooks[this] = {
            set: function (e, t) {
                if (pe.isArray(t)) return e.checked = -1 < pe.inArray(pe(e).val(), t)
            }
        }, ce.checkOn || (pe.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Nt, Ht, Ft = pe.expr.attrHandle,
        jt = /^(?:checked|selected)$/i,
        Wt = ce.getSetAttribute,
        qt = ce.input;
    pe.fn.extend({
        attr: function (e, t) {
            return We(this, pe.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function (e) {
            return this.each(function () {
                pe.removeAttr(this, e)
            })
        }
    }), pe.extend({
        attr: function (e, t, n) {
            var i, o, a = e.nodeType;
            if (3 !== a && 8 !== a && 2 !== a) return "undefined" == typeof e.getAttribute ? pe.prop(e, t, n) : (1 === a && pe.isXMLDoc(e) || (t = t.toLowerCase(), o = pe.attrHooks[t] || (pe.expr.match.bool.test(t) ? Ht : Nt)), n !== undefined ? null === n ? void pe.removeAttr(e, t) : o && "set" in o && (i = o.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = pe.find.attr(e, t)) ? undefined : i)
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ce.radioValue && "radio" === t && pe.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function (e, t) {
            var n, i, o = 0,
                a = t && t.match(De);
            if (a && 1 === e.nodeType)
                for (; n = a[o++];) i = pe.propFix[n] || n, pe.expr.match.bool.test(n) ? qt && Wt || !jt.test(n) ? e[i] = !1 : e[pe.camelCase("default-" + n)] = e[i] = !1 : pe.attr(e, n, ""), e.removeAttribute(Wt ? n : i)
        }
    }), Ht = {
        set: function (e, t, n) {
            return !1 === t ? pe.removeAttr(e, n) : qt && Wt || !jt.test(n) ? e.setAttribute(!Wt && pe.propFix[n] || n, n) : e[pe.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, pe.each(pe.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var a = Ft[t] || pe.find.attr;
        qt && Wt || !jt.test(t) ? Ft[t] = function (e, t, n) {
            var i, o;
            return n || (o = Ft[t], Ft[t] = i, i = null != a(e, t, n) ? t.toLowerCase() : null, Ft[t] = o), i
        } : Ft[t] = function (e, t, n) {
            if (!n) return e[pe.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), qt && Wt || (pe.attrHooks.value = {
        set: function (e, t, n) {
            if (!pe.nodeName(e, "input")) return Nt && Nt.set(e, t, n);
            e.defaultValue = t
        }
    }), Wt || (Nt = {
        set: function (e, t, n) {
            var i = e.getAttributeNode(n);
            if (i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n)) return t
        }
    }, Ft.id = Ft.name = Ft.coords = function (e, t, n) {
        var i;
        if (!n) return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }, pe.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            if (n && n.specified) return n.value
        },
        set: Nt.set
    }, pe.attrHooks.contenteditable = {
        set: function (e, t, n) {
            Nt.set(e, "" !== t && t, n)
        }
    }, pe.each(["width", "height"], function (e, n) {
        pe.attrHooks[n] = {
            set: function (e, t) {
                if ("" === t) return e.setAttribute(n, "auto"), t
            }
        }
    })), ce.style || (pe.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || undefined
        },
        set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var zt = /^(?:input|select|textarea|button|object)$/i,
        Xt = /^(?:a|area)$/i;
    pe.fn.extend({
        prop: function (e, t) {
            return We(this, pe.prop, e, t, 1 < arguments.length)
        },
        removeProp: function (t) {
            return t = pe.propFix[t] || t, this.each(function () {
                try {
                    this[t] = undefined, delete this[t]
                } catch (e) { }
            })
        }
    }), pe.extend({
        prop: function (e, t, n) {
            var i, o, a = e.nodeType;
            if (3 !== a && 8 !== a && 2 !== a) return 1 === a && pe.isXMLDoc(e) || (t = pe.propFix[t] || t, o = pe.propHooks[t]), n !== undefined ? o && "set" in o && (i = o.set(e, n, t)) !== undefined ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = pe.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : zt.test(e.nodeName) || Xt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), ce.hrefNormalized || pe.each(["href", "src"], function (e, t) {
        pe.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ce.optSelected || (pe.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        },
        set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        pe.propFix[this.toLowerCase()] = this
    }), ce.enctype || (pe.propFix.enctype = "encoding");
    var Vt = /[\t\r\n\f]/g;
    pe.fn.extend({
        addClass: function (t) {
            var e, n, i, o, a, s, r, l = 0;
            if (pe.isFunction(t)) return this.each(function (e) {
                pe(this).addClass(t.call(this, e, z(this)))
            });
            if ("string" == typeof t && t)
                for (e = t.match(De) || []; n = this[l++];)
                    if (o = z(n), i = 1 === n.nodeType && (" " + o + " ").replace(Vt, " ")) {
                        for (s = 0; a = e[s++];) i.indexOf(" " + a + " ") < 0 && (i += a + " ");
                        o !== (r = pe.trim(i)) && pe.attr(n, "class", r)
                    }
            return this
        },
        removeClass: function (t) {
            var e, n, i, o, a, s, r, l = 0;
            if (pe.isFunction(t)) return this.each(function (e) {
                pe(this).removeClass(t.call(this, e, z(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(De) || []; n = this[l++];)
                    if (o = z(n), i = 1 === n.nodeType && (" " + o + " ").replace(Vt, " ")) {
                        for (s = 0; a = e[s++];)
                            for (; - 1 < i.indexOf(" " + a + " ");) i = i.replace(" " + a + " ", " ");
                        o !== (r = pe.trim(i)) && pe.attr(n, "class", r)
                    }
            return this
        },
        toggleClass: function (o, t) {
            var a = typeof o;
            return "boolean" == typeof t && "string" === a ? t ? this.addClass(o) : this.removeClass(o) : pe.isFunction(o) ? this.each(function (e) {
                pe(this).toggleClass(o.call(this, e, z(this), t), t)
            }) : this.each(function () {
                var e, t, n, i;
                if ("string" === a)
                    for (t = 0, n = pe(this), i = o.match(De) || []; e = i[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else o !== undefined && "boolean" !== a || ((e = z(this)) && pe._data(this, "__className__", e), pe.attr(this, "class", e || !1 === o ? "" : pe._data(this, "__className__") || ""))
            })
        },
        hasClass: function (e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && -1 < (" " + z(n) + " ").replace(Vt, " ").indexOf(t)) return !0;
            return !1
        }
    }), pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, n) {
        pe.fn[n] = function (e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    }), pe.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var Yt = C.location,
        Ut = pe.now(),
        Kt = /\?/,
        Zt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    pe.parseJSON = function (e) {
        if (C.JSON && C.JSON.parse) return C.JSON.parse(e + "");
        var o, a = null,
            t = pe.trim(e + "");
        return t && !pe.trim(t.replace(Zt, function (e, t, n, i) {
            return o && t && (a = 0), 0 === a ? e : (o = n || t, a += !i - !n, "")
        })) ? Function("return " + t)() : pe.error("Invalid JSON: " + e)
    }, pe.parseXML = function (e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            C.DOMParser ? t = (new C.DOMParser).parseFromString(e, "text/xml") : ((t = new C.ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e))
        } catch (n) {
            t = undefined
        }
        return t && t.documentElement && !t.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + e), t
    };
    var Qt = /#.*$/,
        Gt = /([?&])_=[^&]*/,
        Jt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        en = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        tn = /^(?:GET|HEAD)$/,
        nn = /^\/\//,
        on = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        an = {},
        sn = {},
        rn = "*/".concat("*"),
        ln = Yt.href,
        un = on.exec(ln.toLowerCase()) || [];
    pe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ln,
            type: "GET",
            isLocal: en.test(un[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": rn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": pe.parseJSON,
                "text xml": pe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (e, t) {
            return t ? Y(Y(e, pe.ajaxSettings), t) : Y(pe.ajaxSettings, e)
        },
        ajaxPrefilter: X(an),
        ajaxTransport: X(sn),
        ajax: function (e, t) {
            function n(e, t, n, i) {
                var o, a, s, r, l, u = t;
                2 !== w && (w = 2, h && C.clearTimeout(h), f = undefined, c = i || "", x.readyState = 0 < e ? 4 : 0, o = 200 <= e && e < 300 || 304 === e, n && (r = U(m, x, n)), r = K(m, r, x, o), o ? (m.ifModified && ((l = x.getResponseHeader("Last-Modified")) && (pe.lastModified[d] = l), (l = x.getResponseHeader("etag")) && (pe.etag[d] = l)), 204 === e || "HEAD" === m.type ? u = "nocontent" : 304 === e ? u = "notmodified" : (u = r.state, a = r.data, o = !(s = r.error))) : (s = u, !e && u || (u = "error", e < 0 && (e = 0))), x.status = e, x.statusText = (t || u) + "", o ? y.resolveWith(v, [a, u, x]) : y.rejectWith(v, [x, u, s]), x.statusCode(_), _ = undefined, p && g.trigger(o ? "ajaxSuccess" : "ajaxError", [x, m, o ? a : s]), b.fireWith(v, [x, u]), p && (g.trigger("ajaxComplete", [x, m]), --pe.active || pe.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = undefined), t = t || {};
            var i, o, d, c, h, p, f, a, m = pe.ajaxSetup({}, t),
                v = m.context || m,
                g = m.context && (v.nodeType || v.jquery) ? pe(v) : pe.event,
                y = pe.Deferred(),
                b = pe.Callbacks("once memory"),
                _ = m.statusCode || {},
                s = {},
                r = {},
                w = 0,
                l = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === w) {
                            if (!a)
                                for (a = {}; t = Jt.exec(c);) a[t[1].toLowerCase()] = t[2];
                            t = a[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return 2 === w ? c : null
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return w || (e = r[n] = r[n] || e, s[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return w || (m.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)
                            if (w < 2)
                                for (t in e) _[t] = [_[t], e[t]];
                            else x.always(e[x.status]);
                        return this
                    },
                    abort: function (e) {
                        var t = e || l;
                        return f && f.abort(t), n(0, t), this
                    }
                };
            if (y.promise(x).complete = b.add, x.success = x.done, x.error = x.fail, m.url = ((e || m.url || ln) + "").replace(Qt, "").replace(nn, un[1] + "//"), m.type = t.method || t.type || m.method || m.type, m.dataTypes = pe.trim(m.dataType || "*").toLowerCase().match(De) || [""], null == m.crossDomain && (i = on.exec(m.url.toLowerCase()), m.crossDomain = !(!i || i[1] === un[1] && i[2] === un[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (un[3] || ("http:" === un[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = pe.param(m.data, m.traditional)), V(an, m, t, x), 2 === w) return x;
            for (o in (p = pe.event && m.global) && 0 == pe.active++ && pe.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !tn.test(m.type), d = m.url, m.hasContent || (m.data && (d = m.url += (Kt.test(d) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (m.url = Gt.test(d) ? d.replace(Gt, "$1_=" + Ut++) : d + (Kt.test(d) ? "&" : "?") + "_=" + Ut++)), m.ifModified && (pe.lastModified[d] && x.setRequestHeader("If-Modified-Since", pe.lastModified[d]), pe.etag[d] && x.setRequestHeader("If-None-Match", pe.etag[d])), (m.data && m.hasContent && !1 !== m.contentType || t.contentType) && x.setRequestHeader("Content-Type", m.contentType), x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + rn + "; q=0.01" : "") : m.accepts["*"]), m.headers) x.setRequestHeader(o, m.headers[o]);
            if (m.beforeSend && (!1 === m.beforeSend.call(v, x, m) || 2 === w)) return x.abort();
            for (o in l = "abort", {
                success: 1,
                error: 1,
                complete: 1
            }) x[o](m[o]);
            if (f = V(sn, m, t, x)) {
                if (x.readyState = 1, p && g.trigger(
                    "ajaxSend", [x, m]), 2 === w) return x;
                m.async && 0 < m.timeout && (h = C.setTimeout(function () {
                    x.abort("timeout")
                }, m.timeout));
                try {
                    w = 1, f.send(s, n)
                } catch (u) {
                    if (!(w < 2)) throw u;
                    n(-1, u)
                }
            } else n(-1, "No Transport");
            return x
        },
        getJSON: function (e, t, n) {
            return pe.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return pe.get(e, undefined, t, "script")
        }
    }), pe.each(["get", "post"], function (e, o) {
        pe[o] = function (e, t, n, i) {
            return pe.isFunction(t) && (i = i || n, n = t, t = undefined), pe.ajax(pe.extend({
                url: e,
                type: o,
                dataType: i,
                data: t,
                success: n
            }, pe.isPlainObject(e) && e))
        }
    }), pe._evalUrl = function (e) {
        return pe.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, pe.fn.extend({
        wrapAll: function (t) {
            if (pe.isFunction(t)) return this.each(function (e) {
                pe(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = pe(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function (n) {
            return pe.isFunction(n) ? this.each(function (e) {
                pe(this).wrapInner(n.call(this, e))
            }) : this.each(function () {
                var e = pe(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function (t) {
            var n = pe.isFunction(t);
            return this.each(function (e) {
                pe(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                pe.nodeName(this, "body") || pe(this).replaceWith(this.childNodes)
            }).end()
        }
    }), pe.expr.filters.hidden = function (e) {
        return ce.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : Q(e)
    }, pe.expr.filters.visible = function (e) {
        return !pe.expr.filters.hidden(e)
    };
    var dn = /%20/g,
        cn = /\[\]$/,
        hn = /\r?\n/g,
        pn = /^(?:submit|button|image|reset|file)$/i,
        fn = /^(?:input|select|textarea|keygen)/i;
    pe.param = function (e, t) {
        var n, i = [],
            o = function (e, t) {
                t = pe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (t === undefined && (t = pe.ajaxSettings && pe.ajaxSettings.traditional), pe.isArray(e) || e.jquery && !pe.isPlainObject(e)) pe.each(e, function () {
            o(this.name, this.value)
        });
        else
            for (n in e) G(n, e[n], t, o);
        return i.join("&").replace(dn, "+")
    }, pe.fn.extend({
        serialize: function () {
            return pe.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var e = pe.prop(this, "elements");
                return e ? pe.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !pe(this).is(":disabled") && fn.test(this.nodeName) && !pn.test(e) && (this.checked || !qe.test(e))
            }).map(function (e, t) {
                var n = pe(this).val();
                return null == n ? null : pe.isArray(n) ? pe.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(hn, "\r\n")
                    }
                }) : {
                        name: t.name,
                        value: n.replace(hn, "\r\n")
                    }
            }).get()
        }
    }), pe.ajaxSettings.xhr = C.ActiveXObject !== undefined ? function () {
        return this.isLocal ? ee() : 8 < ie.documentMode ? J() : /^(get|post|head|put|delete|options)$/i.test(this.type) && J() || ee()
    } : J;
    var mn = 0,
        vn = {},
        gn = pe.ajaxSettings.xhr();
    C.attachEvent && C.attachEvent("onunload", function () {
        for (var e in vn) vn[e](undefined, !0)
    }), ce.cors = !!gn && "withCredentials" in gn, (gn = ce.ajax = !!gn) && pe.ajaxTransport(function (u) {
        var d;
        if (!u.crossDomain || ce.cors) return {
            send: function (e, s) {
                var t, r = u.xhr(),
                    l = ++mn;
                if (r.open(u.type, u.url, u.async, u.username, u.password), u.xhrFields)
                    for (t in u.xhrFields) r[t] = u.xhrFields[t];
                for (t in u.mimeType && r.overrideMimeType && r.overrideMimeType(u.mimeType), u.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) e[t] !== undefined && r.setRequestHeader(t, e[t] + "");
                r.send(u.hasContent && u.data || null), d = function (e, t) {
                    var n, i, o;
                    if (d && (t || 4 === r.readyState))
                        if (delete vn[l], d = undefined, r.onreadystatechange = pe.noop, t) 4 !== r.readyState && r.abort();
                        else {
                            o = {}, n = r.status, "string" == typeof r.responseText && (o.text = r.responseText);
                            try {
                                i = r.statusText
                            } catch (a) {
                                i = ""
                            }
                            n || !u.isLocal || u.crossDomain ? 1223 === n && (n = 204) : n = o.text ? 200 : 404
                        }
                    o && s(n, i, o, r.getAllResponseHeaders())
                }, u.async ? 4 === r.readyState ? C.setTimeout(d) : r.onreadystatechange = vn[l] = d : d()
            },
            abort: function () {
                d && d(undefined, !0)
            }
        }
    }), pe.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (e) {
                return pe.globalEval(e), e
            }
        }
    }), pe.ajaxPrefilter("script", function (e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), pe.ajaxTransport("script", function (t) {
        if (t.crossDomain) {
            var i, o = ie.head || pe("head")[0] || ie.documentElement;
            return {
                send: function (e, n) {
                    (i = ie.createElement("script")).async = !0, t.scriptCharset && (i.charset = t.scriptCharset), i.src = t.url, i.onload = i.onreadystatechange = function (e, t) {
                        (t || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, t || n(200, "success"))
                    }, o.insertBefore(i, o.firstChild)
                },
                abort: function () {
                    i && i.onload(undefined, !0)
                }
            }
        }
    });
    var yn = [],
        bn = /(=)\?(?=&|$)|\?\?/;
    pe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = yn.pop() || pe.expando + "_" + Ut++;
            return this[e] = !0, e
        }
    }), pe.ajaxPrefilter("json jsonp", function (e, t, n) {
        var i, o, a, s = !1 !== e.jsonp && (bn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && bn.test(e.data) && "data");
        if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = pe.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(bn, "$1" + i) : !1 !== e.jsonp && (e.url += (Kt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
            return a || pe.error(i + " was not called"), a[0]
        }, e.dataTypes[0] = "json", o = C[i], C[i] = function () {
            a = arguments
        }, n.always(function () {
            o === undefined ? pe(C).removeProp(i) : C[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, yn.push(i)), a && pe.isFunction(o) && o(a[0]), a = o = undefined
        }), "script"
    }), pe.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || ie;
        var i = xe.exec(e),
            o = !n && [];
        return i ? [t.createElement(i[1])] : (i = m([e], t, o), o && o.length && pe(o).remove(), pe.merge([], i.childNodes))
    };
    var _n = pe.fn.load;
    pe.fn.load = function (e, t, n) {
        if ("string" != typeof e && _n) return _n.apply(this, arguments);
        var i, o, a, s = this,
            r = e.indexOf(" ");
        return -1 < r && (i = pe.trim(e.slice(r, e.length)), e = e.slice(0, r)), pe.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (o = "POST"), 0 < s.length && pe.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function (e) {
            a = arguments, s.html(i ? pe("<div>").append(pe.parseHTML(e)).find(i) : e)
        }).always(n && function (e, t) {
            s.each(function () {
                n.apply(this, a || [e.responseText, t, e])
            })
        }), this
    }, pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        pe.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), pe.expr.filters.animated = function (t) {
        return pe.grep(pe.timers, function (e) {
            return t === e.elem
        }).length
    }, pe.offset = {
        setOffset: function (e, t, n) {
            var i, o, a, s, r, l, u = pe.css(e, "position"),
                d = pe(e),
                c = {};
            "static" === u && (e.style.position = "relative"), r = d.offset(), a = pe.css(e, "top"), l = pe.css(e, "left"), ("absolute" === u || "fixed" === u) && -1 < pe.inArray("auto", [a, l]) ? (s = (i = d.position()).top, o = i.left) : (s = parseFloat(a) || 0, o = parseFloat(l) || 0), pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, r))), null != t.top && (c.top = t.top - r.top + s), null != t.left && (c.left = t.left - r.left + o), "using" in t ? t.using.call(e, c) : d.css(c)
        }
    }, pe.fn.extend({
        offset: function (t) {
            if (arguments.length) return t === undefined ? this : this.each(function (e) {
                pe.offset.setOffset(this, t, e)
            });
            var e, n, i = {
                top: 0,
                left: 0
            },
                o = this[0],
                a = o && o.ownerDocument;
            return a ? (e = a.documentElement, pe.contains(e, o) ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()), n = te(a), {
                top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : i) : void 0
        },
        position: function () {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                },
                    i = this[0];
                return "fixed" === pe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), pe.nodeName(e[0], "html") || (n = e.offset()), n.top += pe.css(e[0], "borderTopWidth", !0), n.left += pe.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - pe.css(i, "marginTop", !0),
                    left: t.left - n.left - pe.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent; e && !pe.nodeName(e, "html") && "static" === pe.css(e, "position");) e = e.offsetParent;
                return e || mt
            })
        }
    }), pe.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (t, o) {
        var a = /Y/.test(o);
        pe.fn[t] = function (e) {
            return We(this, function (e, t, n) {
                var i = te(e);
                if (n === undefined) return i ? o in i ? i[o] : i.document.documentElement[t] : e[t];
                i ? i.scrollTo(a ? pe(i).scrollLeft() : n, a ? n : pe(i).scrollTop()) : e[t] = n
            }, t, e, arguments.length, null)
        }
    }), pe.each(["top", "left"], function (e, n) {
        pe.cssHooks[n] = O(ce.pixelPosition, function (e, t) {
            if (t) return t = gt(e, n), pt.test(t) ? pe(e).position()[n] + "px" : t
        })
    }), pe.each({
        Height: "height",
        Width: "width"
    }, function (a, s) {
        pe.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function (i, e) {
            pe.fn[e] = function (e, t) {
                var n = arguments.length && (i || "boolean" != typeof e),
                    o = i || (!0 === e || !0 === t ? "margin" : "border");
                return We(this, function (e, t, n) {
                    var i;
                    return pe.isWindow(e) ? e.document.documentElement["client" + a] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + a], i["scroll" + a], e.body["offset" + a], i["offset" + a], i["client" + a])) : n === undefined ? pe.css(e, t, o) : pe.style(e, t, n, o)
                }, s, n ? e : undefined, n, null)
            }
        })
    }), pe.fn.extend({
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        delegate: function (e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), pe.fn.size = function () {
        return this.length
    }, pe.fn.andSelf = pe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return pe
    });
    var wn = C.jQuery,
        xn = C.$;
    return pe.noConflict = function (e) {
        return C.$ === pe && (C.$ = xn), e && C.jQuery === pe && (C.jQuery = wn), pe
    }, e || (C.jQuery = C.$ = pe), pe
}),
    function (d, l) {
        "use strict";
        var u;
        d.rails !== l && d.error("jquery-ujs has already been loaded!");
        var e = d(document);
        d.rails = u = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
            buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
            disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
            fileInputSelector: "input[name][type=file]:not([disabled])",
            linkDisableSelector: "a[data-disable-with], a[data-disable]",
            buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
            csrfToken: function () {
                return d("meta[name=csrf-token]").attr("content")
            },
            csrfParam: function () {
                return d("meta[name=csrf-param]").attr("content")
            },
            CSRFProtection: function (e) {
                var t = u.csrfToken();
                t && e.setRequestHeader("X-CSRF-Token", t)
            },
            refreshCSRFTokens: function () {
                d('form input[name="' + u.csrfParam() + '"]').val(u.csrfToken())
            },
            fire: function (e, t, n) {
                var i = d.Event(t);
                return e.trigger(i, n), !1 !== i.result
            },
            confirm: function (e) {
                return confirm(e)
            },
            ajax: function (e) {
                return d.ajax(e)
            },
            href: function (e) {
                return e[0].href
            },
            isRemote: function (e) {
                return e.data("remote") !== l && !1 !== e.data("remote")
            },
            handleRemote: function (i) {
                var e, t, n, o, a, s;
                if (u.fire(i, "ajax:before")) {
                    if (o = i.data("with-credentials") || null, a = i.data("type") || d.ajaxSettings && d.ajaxSettings.dataType, i.is("form")) {
                        e = i.data("ujs:submit-button-formmethod") || i.attr("method"), t = i.data("ujs:submit-button-formaction") || i.attr("action"), n = d(i[0]).serializeArray();
                        var r = i.data("ujs:submit-button");
                        r && (n.push(r), i.data("ujs:submit-button", null)), i.data("ujs:submit-button-formmethod", null), i.data("ujs:submit-button-formaction", null)
                    } else i.is(u.inputChangeSelector) ? (e = i.data("method"), t = i.data("url"), n = i.serialize(), i.data("params") && (n = n + "&" + i.data("params"))) : i.is(u.buttonClickSelector) ? (e = i.data("method") || "get", t = i.data("url"), n = i.serialize(), i.data("params") && (n = n + "&" + i.data("params"))) : (e = i.data("method"), t = u.href(i), n = i.data("params") || null);
                    return s = {
                        type: e || "GET",
                        data: n,
                        dataType: a,
                        beforeSend: function (e, t) {
                            if (t.dataType === l && e.setRequestHeader("accept", "*/*;q=0.5, " + t.accepts.script), !u.fire(i, "ajax:beforeSend", [e, t])) return !1;
                            i.trigger("ajax:send", e)
                        },
                        success: function (e, t, n) {
                            i.trigger("ajax:success", [e, t, n])
                        },
                        complete: function (e, t) {
                            i.trigger("ajax:complete", [e, t])
                        },
                        error: function (e, t, n) {
                            i.trigger("ajax:error", [e, t, n])
                        },
                        crossDomain: u.isCrossDomain(t)
                    }, o && (s.xhrFields = {
                        withCredentials: o
                    }), t && (s.url = t), u.ajax(s)
                }
                return !1
            },
            isCrossDomain: function (e) {
                var t = document.createElement("a");
                t.href = location.href;
                var n = document.createElement("a");
                try {
                    return n.href = e, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
                } catch (i) {
                    return !0
                }
            },
            handleMethod: function (e) {
                var t = u.href(e),
                    n = e.data("method"),
                    i = e.attr("target"),
                    o = u.csrfToken(),
                    a = u.csrfParam(),
                    s = d('<form method="post" action="' + t + '"></form>'),
                    r = '<input name="_method" value="' + n + '" type="hidden" />';
                a === l || o === l || u.isCrossDomain(t) || (r += '<input name="' + a + '" value="' + o + '" type="hidden" />'), i && s.attr("target", i), s.hide().append(r).appendTo("body"), s.submit()
            },
            formElements: function (e, t) {
                return e.is("form") ? d(e[0].elements).filter(t) : e.find(t)
            },
            disableFormElements: function (e) {
                u.formElements(e, u.disableSelector).each(function () {
                    u.disableFormElement(d(this))
                })
            },
            disableFormElement: function (e) {
                var t, n;
                t = e.is("button") ? "html" : "val", (n = e.data("disable-with")) !== l && (e.data("ujs:enable-with", e[t]()), e[t](n)), e.prop("disabled", !0), e.data("ujs:disabled", !0)
            },
            enableFormElements: function (e) {
                u.formElements(e, u.enableSelector).each(function () {
                    u.enableFormElement(d(this))
                })
            },
            enableFormElement: function (e) {
                var t = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with") !== l && (e[t](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.prop("disabled", !1), e.removeData("ujs:disabled")
            },
            allowAction: function (e) {
                var t, n = e.data("confirm"),
                    i = !1;
                if (!n) return !0;
                if (u.fire(e, "confirm")) {
                    try {
                        i = u.confirm(n)
                    } catch (o) {
                        (console.error || console.log).call(console, o.stack || o)
                    }
                    t = u.fire(e, "confirm:complete", [i])
                }
                return i && t
            },
            blankInputs: function (e, t, n) {
                var i, o, a, s = d(),
                    r = t || "input,textarea",
                    l = e.find(r),
                    u = {};
                return l.each(function () {
                    (i = d(this)).is("input[type=radio]") ? (a = i.attr("name"), u[a] || (0 === e.find('input[type=radio]:checked[name="' + a + '"]').length && (o = e.find('input[type=radio][name="' + a + '"]'), s = s.add(o)), u[a] = a)) : (i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") : !!i.val()) === n && (s = s.add(i))
                }), !!s.length && s
            },
            nonBlankInputs: function (e, t) {
                return u.blankInputs(e, t, !0)
            },
            stopEverything: function (e) {
                return d(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            disableElement: function (e) {
                var t = e.data("disable-with");
                t !== l && (e.data("ujs:enable-with", e.html()), e.html(t)), e.bind("click.railsDisable", function (e) {
                    return u.stopEverything(e)
                }), e.data("ujs:disabled", !0)
            },
            enableElement: function (e) {
                e.data("ujs:enable-with") !== l && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable"), e.removeData("ujs:disabled")
            }
        }, u.fire(e, "rails:attachBindings") && (d.ajaxPrefilter(function (e, t, n) {
            e.crossDomain || u.CSRFProtection(n)
        }), d(window).on("pageshow.rails", function () {
            d(d.rails.enableSelector).each(function () {
                var e = d(this);
                e.data("ujs:disabled") && d.rails.enableFormElement(e)
            }), d(d.rails.linkDisableSelector).each(function () {
                var e = d(this);
                e.data("ujs:disabled") && d.rails.enableElement(e)
            })
        }), e.on("ajax:complete", u.linkDisableSelector, function () {
            u.enableElement(d(this))
        }), e.on("ajax:complete", u.buttonDisableSelector, function () {
            u.enableFormElement(d(this))
        }), e.on("click.rails", u.linkClickSelector, function (e) {
            var t = d(this),
                n = t.data("method"),
                i = t.data("params"),
                o = e.metaKey || e.ctrlKey;
            if (!u.allowAction(t)) return u.stopEverything(e);
            if (!o && t.is(u.linkDisableSelector) && u.disableElement(t), u.isRemote(t)) {
                if (o && (!n || "GET" === n) && !i) return !0;
                var a = u.handleRemote(t);
                return !1 === a ? u.enableElement(t) : a.fail(function () {
                    u.enableElement(t)
                }), !1
            }
            return n ? (u.handleMethod(t), !1) : void 0
        }), e.on("click.rails", u.buttonClickSelector, function (e) {
            var t = d(this);
            if (!u.allowAction(t) || !u.isRemote(t)) return u.stopEverything(e);
            t.is(u.buttonDisableSelector) && u.disableFormElement(t);
            var n = u.handleRemote(t);
            return !1 === n ? u.enableFormElement(t) : n.fail(function () {
                u.enableFormElement(t)
            }), !1
        }), e.on("change.rails", u.inputChangeSelector, function (e) {
            var t = d(this);
            return u.allowAction(t) && u.isRemote(t) ? (u.handleRemote(t), !1) : u.stopEverything(e)
        }), e.on("submit.rails", u.formSubmitSelector, function (e) {
            var t, n, i = d(this),
                o = u.isRemote(i);
            if (!u.allowAction(i)) return u.stopEverything(e);
            if (i.attr("novalidate") === l)
                if (i.data("ujs:formnovalidate-button") === l) {
                    if ((t = u.blankInputs(i, u.requiredInputSelector, !1)) && u.fire(i, "ajax:aborted:required", [t])) return u.stopEverything(e)
                } else i.data("ujs:formnovalidate-button", l);
            if (o) {
                if (n = u.nonBlankInputs(i, u.fileInputSelector)) {
                    setTimeout(function () {
                        u.disableFormElements(i)
                    }, 13);
                    var a = u.fire(i, "ajax:aborted:file", [n]);
                    return a || setTimeout(function () {
                        u.enableFormElements(i)
                    }, 13), a
                }
                return u.handleRemote(i), !1
            }
            setTimeout(function () {
                u.disableFormElements(i)
            }, 13)
        }), e.on("click.rails", u.formInputClickSelector, function (e) {
            var t = d(this);
            if (!u.allowAction(t)) return u.stopEverything(e);
            var n = t.attr("name"),
                i = n ? {
                    name: n,
                    value: t.val()
                } : null,
                o = t.closest("form");
            0 === o.length && (o = d("#" + t.attr("form"))), o.data("ujs:submit-button", i), o.data("ujs:formnovalidate-button", t.attr("formnovalidate")), o.data("ujs:submit-button-formaction", t.attr("formaction")), o.data("ujs:submit-button-formmethod", t.attr("formmethod"))
        }), e.on("ajax:send.rails", u.formSubmitSelector, function (e) {
            this === e.target && u.disableFormElements(d(this))
        }), e.on("ajax:complete.rails", u.formSubmitSelector, function (e) {
            this === e.target && u.enableFormElements(d(this))
        }), d(function () {
            u.refreshCSRFTokens()
        }))
    }(jQuery);
var _get = function e(t, n, i) {
    null === t && (t = Function.prototype);
    var o = Object.getOwnPropertyDescriptor(t, n);
    if (o === undefined) {
        var a = Object.getPrototypeOf(t);
        return null === a ? undefined : e(a, n, i)
    }
    if ("value" in o) return o.value;
    var s = o.get;
    return s === undefined ? undefined : s.call(i)
},
    _createClass = function () {
        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        return function (e, t, n) {
            return t && i(e.prototype, t), n && i(e, n), e
        }
    }();
! function (e) {
    window.cash = e()
}(function () {
    function a(e, t) {
        return t = t || S, P.test(e) ? t.getElementsByClassName(e.slice(1)) : H.test(e) ? t.getElementsByTagName(e) : t.querySelectorAll(e)
    }

    function s(e) {
        if (!M) {
            var t = (M = S.implementation.createHTMLDocument(null)).createElement("base");
            t.href = S.location.href, M.head.appendChild(t)
        }
        return M.body.innerHTML = e, M.body.childNodes
    }

    function r(e) {
        "loading" !== S.readyState ? e() : S.addEventListener("DOMContentLoaded", e)
    }

    function n(e, t) {
        if (!e) return this;
        if (e.cash && e !== L) return e;
        var n, i = e,
            o = 0;
        if (I(e)) i = R.test(e) ? S.getElementById(e.slice(1)) : N.test(e) ? s(e) : a(e, t);
        else if (B(e)) return r(e), this;
        if (!i) return this;
        if (i.nodeType || i === L) this[0] = i, this.length = 1;
        else
            for (n = this.length = i.length; o < n; o++) this[o] = i[o];
        return this
    }

    function i(e, t) {
        return new n(e, t)
    }

    function l(e, t) {
        for (var n = e.length, i = 0; i < n && !1 !== t.call(e[i], e[i], i, e); i++);
    }

    function u(e, t) {
        var n = e && (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector);
        return !!n && n.call(e, t)
    }

    function e(t) {
        return I(t) ? u : t.cash ? function (e) {
            return t.is(e)
        } : function (e, t) {
            return e === t
        }
    }

    function o(e) {
        return i(D.call(e).filter(function (e, t, n) {
            return n.indexOf(e) === t
        }))
    }

    function d(e) {
        return e[j] = e[j] || {}
    }

    function c(e, t, n) {
        return d(e)[t] = n
    }

    function h(e, t) {
        var n = d(e);
        return n[t] === undefined && (n[t] = e.dataset ? e.dataset[t] : i(e).attr("data-" + t)), n[t]
    }

    function p(e, t) {
        var n = d(e);
        n ? delete n[t] : e.dataset ? delete e.dataset[t] : i(e).removeAttr("data-" + name)
    }

    function f(e) {
        return I(e) && e.match(W)
    }

    function m(e, t) {
        return e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className)
    }

    function v(e, t, n) {
        e.classList ? e.classList.add(t) : n.indexOf(" " + t + " ") && (e.className += " " + t)
    }

    function g(e, t) {
        e.classList ? e.classList.remove(t) : e.className = e.className.replace(t, "")
    }

    function y(e, t) {
        return parseInt(L.getComputedStyle(e[0], null)[t], 10) || 0
    }

    function b(e, t, n) {
        var i = h(e, "_cashEvents") || c(e, "_cashEvents", {});
        i[t] = i[t] || [], i[t].push(n), e.addEventListener(t, n)
    }

    function _(t, n, e) {
        var i, o = h(t, "_cashEvents"),
            a = o && o[n];
        a && (e ? (t.removeEventListener(n, e), 0 <= (i = a.indexOf(e)) && a.splice(i, 1)) : (l(a, function (e) {
            t.removeEventListener(n, e)
        }), a = []))
    }

    function w(e, t) {
        return "&" + encodeURIComponent(e) + "=" + encodeURIComponent(t).replace(/%20/g, "+")
    }

    function x(e) {
        var t = [];
        return l(e.options, function (e) {
            e.selected && t.push(e.value)
        }), t.length ? t : null
    }

    function C(e) {
        var t = e.selectedIndex;
        return 0 <= t ? e.options[t].value : null
    }

    function k(e) {
        var t = e.type;
        if (!t) return null;
        switch (t.toLowerCase()) {
            case "select-one":
                return C(e);
            case "select-multiple":
                return x(e);
            case "radio":
            case "checkbox":
                return e.checked ? e.value : null;
            default:
                return e.value ? e.value : null
        }
    }

    function E(e, t, n) {
        if (n) {
            var i = e.childNodes[0];
            e.insertBefore(t, i)
        } else e.appendChild(t)
    }

    function T(t, n, i) {
        var e = I(n);
        e || !n.length ? l(t, e ? function (e) {
            return e.insertAdjacentHTML(i ? "afterbegin" : "beforeend", n)
        } : function (e, t) {
            return E(e, 0 === t ? n : n.cloneNode(!0), i)
        }) : l(n, function (e) {
            return T(t, e, i)
        })
    }
    var M, S = document,
        L = window,
        t = Array.prototype,
        D = t.slice,
        O = t.filter,
        $ = t.push,
        A = function () { },
        B = function (e) {
            return typeof e == typeof A && e.call
        },
        I = function (e) {
            return "string" == typeof e
        },
        R = /^#[\w-]*$/,
        P = /^\.[\w-]*$/,
        N = /<.+>/,
        H = /^\w+$/,
        F = i.fn = i.prototype = n.prototype = {
            cash: !0,
            length: 0,
            push: $,
            splice: t.splice,
            map: t.map,
            init: n
        };
    Object.defineProperty(F, "constructor", {
        value: i
    }), i.parseHTML = s, i.noop = A, i.isFunction = B, i.isString = I, i.extend = F.extend = function (e) {
        e = e || {};
        var t = D.call(arguments),
            n = t.length,
            i = 1;
        for (1 === t.length && (e = this, i = 0); i < n; i++)
            if (t[i])
                for (var o in t[i]) t[i].hasOwnProperty(o) && (e[o] = t[i][o]);
        return e
    }, i.extend({
        merge: function (e, t) {
            for (var n = +t.length, i = e.length, o = 0; o < n; i++ , o++) e[i] = t[o];
            return e.length = i, e
        },
        each: l,
        matches: u,
        unique: o,
        isArray: Array.isArray,
        isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }
    });
    var j = i.uid = "_cash" + Date.now();
    F.extend({
        data: function (t, n) {
            if (I(t)) return n === undefined ? h(this[0], t) : this.each(function (e) {
                return c(e, t, n)
            });
            for (var e in t) this.data(e, t[e]);
            return this
        },
        removeData: function (t) {
            return this.each(function (e) {
                return p(e, t)
            })
        }
    });
    var W = /\S+/g;
    F.extend({
        addClass: function (e) {
            var i = f(e);
            return i ? this.each(function (t) {
                var n = " " + t.className + " ";
                l(i, function (e) {
                    v(t, e, n)
                })
            }) : this
        },
        attr: function (t, n) {
            if (!t) return undefined;
            if (I(t)) return n === undefined ? this[0] ? this[0].getAttribute ? this[0].getAttribute(t) : this[0][t] : undefined : this.each(function (e) {
                e.setAttribute ? e.setAttribute(t, n) : e[t] = n
            });
            for (var e in t) this.attr(e, t[e]);
            return this
        },
        hasClass: function (e) {
            var t = !1,
                n = f(e);
            return n && n.length && this.each(function (e) {
                return !(t = m(e, n[0]))
            }), t
        },
        prop: function (t, n) {
            if (I(t)) return n === undefined ? this[0][t] : this.each(function (e) {
                e[t] = n
            });
            for (var e in t) this.prop(e, t[e]);
            return this
        },
        removeAttr: function (t) {
            return this.each(function (e) {
                e.removeAttribute ? e.removeAttribute(t) : delete e[t]
            })
        },
        removeClass: function (e) {
            if (!arguments.length) return this.attr("class", "");
            var n = f(e);
            return n ? this.each(function (t) {
                l(n, function (e) {
                    g(t, e)
                })
            }) : this
        },
        removeProp: function (t) {
            return this.each(function (e) {
                delete e[t]
            })
        },
        toggleClass: function (e, t) {
            if (t !== undefined) return this[t ? "addClass" : "removeClass"](e);
            var i = f(e);
            return i ? this.each(function (t) {
                var n = " " + t.className + " ";
                l(i, function (e) {
                    m(t, e) ? g(t, e) : v(t, e, n)
                })
            }) : this
        }
    }), F.extend({
        add: function (e, t) {
            return o(i.merge(this, i(e, t)))
        },
        each: function (e) {
            return l(this, e), this
        },
        eq: function (e) {
            return i(this.get(e))
        },
        filter: function (t) {
            if (!t) return this;
            var n = B(t) ? t : e(t);
            return i(O.call(this, function (e) {
                return n(e, t)
            }))
        },
        first: function () {
            return this.eq(0)
        },
        get: function (e) {
            return e === undefined ? D.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        index: function (e) {
            var t = e ? i(e)[0] : this[0],
                n = e ? this : i(t).parent().children();
            return D.call(n).indexOf(t)
        },
        last: function () {
            return this.eq(-1)
        }
    });
    var q, z, X, V, Y = (q = /(?:^\w|[A-Z]|\b\w)/g, z = /[\s-_]+/g, function (e) {
        return e.replace(q, function (e, t) {
            return e[0 === t ? "toLowerCase" : "toUpperCase"]()
        }).replace(z, "")
    }),
        U = (X = {}, V = document.createElement("div").style, function (t) {
            if (t = Y(t), X[t]) return X[t];
            var e = t.charAt(0).toUpperCase() + t.slice(1);
            return l((t + " " + ["webkit", "moz", "ms", "o"].join(e + " ") + e).split(" "), function (e) {
                if (e in V) return X[e] = t = X[t] = e, !1
            }), X[t]
        });
    i.prefixedProp = U, i.camelCase = Y, F.extend({
        css: function (t, n) {
            if (I(t)) return t = U(t), 1 < arguments.length ? this.each(function (e) {
                return e.style[t] = n
            }) : L.getComputedStyle(this[0])[t];
            for (var e in t) this.css(e, t[e]);
            return this
        }
    }), l(["Width", "Height"], function (t) {
        var e = t.toLowerCase();
        F[e] = function () {
            return this[0].getBoundingClientRect()[e]
        }, F["inner" + t] = function () {
            return this[0]["client" + t]
        }, F["outer" + t] = function (e) {
            return this[0]["offset" + t] + (e ? y(this, "margin" + ("Width" === t ? "Left" : "Top")) + y(this, "margin" + ("Width" === t ? "Right" : "Bottom")) : 0)
        }
    }), F.extend({
        off: function (t, n) {
            return this.each(function (e) {
                return _(e, t, n)
            })
        },
        on: function (n, i, o, a) {
            var s;
            if (!I(n)) {
                for (var e in n) this.on(e, i, n[e]);
                return this
            }
            return B(i) && (o = i, i = null), "ready" === n ? (r(o), this) : (i && (s = o, o = function (e) {
                for (var t = e.target; !u(t, i);) {
                    if (t === this || null === t) return !1;
                    t = t.parentNode
                }
                t && s.call(t, e)
            }), this.each(function (e) {
                var t = o;
                a && (t = function () {
                    o.apply(this, arguments), _(e, n, t)
                }), b(e, n, t)
            }))
        },
        one: function (e, t, n) {
            return this.on(e, t, n, !0)
        },
        ready: r,
        trigger: function (e, t) {
            if (document.createEvent) {
                var n = document.createEvent("HTMLEvents");
                return n.initEvent(e, !0, !1), n = this.extend(n, t), this.each(function (e) {
                    return e.dispatchEvent(n)
                })
            }
        }
    }), F.extend({
        serialize: function () {
            var o = "";
            return l(this[0].elements || this, function (e) {
                if (!e.disabled && "FIELDSET" !== e.tagName) {
                    var t = e.name;
                    switch (e.type.toLowerCase()) {
                        case "file":
                        case "reset":
                        case "submit":
                        case "button":
                            break;
                        case "select-multiple":
                            var n = k(e);
                            null !== n && l(n, function (e) {
                                o += w(t, e)
                            });
                            break;
                        default:
                            var i = k(e);
                            null !== i && (o += w(t, i))
                    }
                }
            }), o.substr(1)
        },
        val: function (t) {
            return t === undefined ? k(this[0]) : this.each(function (e) {
                return e.value = t
            })
        }
    }), F.extend({
        after: function (e) {
            return i(e).insertAfter(this), this
        },
        append: function (e) {
            return T(this, e), this
        },
        appendTo: function (e) {
            return T(i(e), this), this
        },
        before: function (e) {
            return i(e).insertBefore(this), this
        },
        clone: function () {
            return i(this.map(function (e) {
                return e.cloneNode(!0)
            }))
        },
        empty: function () {
            return this.html(""), this
        },
        html: function (e) {
            if (e === undefined) return this[0].innerHTML;
            var t = e.nodeType ? e[0].outerHTML : e;
            return this.each(function (e) {
                return e.innerHTML = t
            })
        },
        insertAfter: function (e) {
            var o = this;
            return i(e).each(function (e, t) {
                var n = e.parentNode,
                    i = e.nextSibling;
                o.each(function (e) {
                    n.insertBefore(0 === t ? e : e.cloneNode(!0), i)
                })
            }), this
        },
        insertBefore: function (e) {
            var o = this;
            return i(e).each(function (t, n) {
                var i = t.parentNode;
                o.each(function (e) {
                    i.insertBefore(0 === n ? e : e.cloneNode(!0), t)
                })
            }), this
        },
        prepend: function (e) {
            return T(this, e, !0), this
        },
        prependTo: function (e) {
            return T(i(e), this, !0), this
        },
        remove: function () {
            return this.each(function (e) {
                if (e.parentNode) return e.parentNode.removeChild(e)
            })
        },
        text: function (t) {
            return t === undefined ? this[0].textContent : this.each(function (e) {
                return e.textContent = t
            })
        }
    });
    var K = S.documentElement;
    return F.extend({
        position: function () {
            var e = this[0];
            return {
                left: e.offsetLeft,
                top: e.offsetTop
            }
        },
        offset: function () {
            var e = this[0].getBoundingClientRect();
            return {
                top: e.top + L.pageYOffset - K.clientTop,
                left: e.left + L.pageXOffset - K.clientLeft
            }
        },
        offsetParent: function () {
            return i(this[0].offsetParent)
        }
    }), F.extend({
        children: function (t) {
            var n = [];
            return this.each(function (e) {
                $.apply(n, e.children)
            }), n = o(n), t ? n.filter(function (e) {
                return u(e, t)
            }) : n
        },
        closest: function (e) {
            return !e || this.length < 1 ? i() : this.is(e) ? this.filter(e) : this.parent().closest(e)
        },
        is: function (t) {
            if (!t) return !1;
            var n = !1,
                i = e(t);
            return this.each(function (e) {
                return !(n = i(e, t))
            }), n
        },
        find: function (t) {
            if (!t || t.nodeType) return i(t && this.has(t).length ? t : null);
            var n = [];
            return this.each(function (e) {
                $.apply(n, a(t, e))
            }), o(n)
        },
        has: function (t) {
            var e = I(t) ? function (e) {
                return 0 !== a(t, e).length
            } : function (e) {
                return e.contains(t)
            };
            return this.filter(e)
        },
        next: function () {
            return i(this[0].nextElementSibling)
        },
        not: function (t) {
            if (!t) return this;
            var n = e(t);
            return this.filter(function (e) {
                return !n(e, t)
            })
        },
        parent: function () {
            var t = [];
            return this.each(function (e) {
                e && e.parentNode && t.push(e.parentNode)
            }), o(t)
        },
        parents: function (t) {
            var n, i = [];
            return this.each(function (e) {
                for (n = e; n && n.parentNode && n !== S.body.parentNode;) n = n.parentNode, (!t || t && u(n, t)) && i.push(n)
            }), o(i)
        },
        prev: function () {
            return i(this[0].previousElementSibling)
        },
        siblings: function (e) {
            var t = this.parent().children(e),
                n = this[0];
            return t.filter(function (e) {
                return e !== n
            })
        }
    }), i
});
var Component = function () {
    function i(e, t) {
        _classCallCheck(this, i), t instanceof Element || console.error(Error(t + " is not an HTML Element"));
        var n = e.getInstance(t);
        n && n.destroy(), this.el = t, this.$el = cash(t)
    }
    return _createClass(i, null, [{
        key: "init",
        value: function (e, t, n) {
            var i = null;
            if (t instanceof Element) i = new e(t, n);
            else if (t && (t.jquery || t.cash || t instanceof NodeList)) {
                for (var o = [], a = 0; a < t.length; a++) o.push(new e(t[a], n));
                i = o
            }
            return i
        }
    }]), i
}();
! function (e) {
    e.Package ? M = {} : e.M = {}, M.jQueryLoaded = !!e.jQuery
}(window), "function" == typeof define && define.amd ? define("M", [], function () {
    return M
}) : "undefined" == typeof exports || exports.nodeType || ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = M), exports["default"] = M), M.version = "1.0.0", M.keys = {
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    ARROW_UP: 38,
    ARROW_DOWN: 40
}, M.tabPressed = !1, M.keyDown = !1;
var docHandleKeydown = function (e) {
    M.keyDown = !0, e.which !== M.keys.TAB && e.which !== M.keys.ARROW_DOWN && e.which !== M.keys.ARROW_UP || (M.tabPressed = !0)
},
    docHandleKeyup = function (e) {
        M.keyDown = !1, e.which !== M.keys.TAB && e.which !== M.keys.ARROW_DOWN && e.which !== M.keys.ARROW_UP || (M.tabPressed = !1)
    },
    docHandleFocus = function () {
        M.keyDown && document.body.classList.add("keyboard-focused")
    },
    docHandleBlur = function () {
        document.body.classList.remove("keyboard-focused")
    };
document.addEventListener("keydown", docHandleKeydown, !0), document.addEventListener("keyup", docHandleKeyup, !0), document.addEventListener("focus", docHandleFocus, !0), document.addEventListener("blur", docHandleBlur, !0), M.initializeJqueryWrapper = function (i, o, a) {
    jQuery.fn[o] = function (t) {
        if (i.prototype[t]) {
            var n = Array.prototype.slice.call(arguments, 1);
            if ("get" === t.slice(0, 3)) {
                var e = this.first()[0][a];
                return e[t].apply(e, n)
            }
            return this.each(function () {
                var e = this[a];
                e[t].apply(e, n)
            })
        }
        if ("object" == typeof t || !t) return i.init(this, t), this;
        jQuery.error("Method " + t + " does not exist on jQuery." + o)
    }
}, M.AutoInit = function (e) {
    var t = e || document.body,
        n = {
            Autocomplete: t.querySelectorAll(".autocomplete:not(.no-autoinit)"),
            Carousel: t.querySelectorAll(".carousel:not(.no-autoinit)"),
            Chips: t.querySelectorAll(".chips:not(.no-autoinit)"),
            Collapsible: t.querySelectorAll(".collapsible:not(.no-autoinit)"),
            Datepicker: t.querySelectorAll(".datepicker:not(.no-autoinit)"),
            Dropdown: t.querySelectorAll(".dropdown-trigger:not(.no-autoinit)"),
            Materialbox: t.querySelectorAll(".materialboxed:not(.no-autoinit)"),
            Modal: t.querySelectorAll(".modal:not(.no-autoinit)"),
            Parallax: t.querySelectorAll(".parallax:not(.no-autoinit)"),
            Pushpin: t.querySelectorAll(".pushpin:not(.no-autoinit)"),
            ScrollSpy: t.querySelectorAll(".scrollspy:not(.no-autoinit)"),
            FormSelect: t.querySelectorAll("select:not(.no-autoinit)"),
            Sidenav: t.querySelectorAll(".sidenav:not(.no-autoinit)"),
            Tabs: t.querySelectorAll(".tabs:not(.no-autoinit)"),
            TapTarget: t.querySelectorAll(".tap-target:not(.no-autoinit)"),
            Timepicker: t.querySelectorAll(".timepicker:not(.no-autoinit)"),
            Tooltip: t.querySelectorAll(".tooltipped:not(.no-autoinit)"),
            FloatingActionButton: t.querySelectorAll(".fixed-action-btn:not(.no-autoinit)")
        };
    for (var i in n) {
        M[i].init(n[i])
    }
}, M.objectSelectorString = function (e) {
    return ((e.prop("tagName") || "") + (e.attr("id") || "") + (e.attr("class") || "")).replace(/\s/g, "")
}, M.guid = function () {
    function e() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return function () {
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    }
}(), M.escapeHash = function (e) {
    return e.replace(/(:|\.|\[|\]|,|=|\/)/g, "\\$1")
},
    M.elementOrParentIsFixed = function (e) {
        var t = $(e),
            n = t.add(t.parents()),
            i = !1;
        return n.each(function () {
            if ("fixed" === $(this).css("position")) return !(i = !0)
        }), i
    }, M.checkWithinContainer = function (e, t, n) {
        var i = {
            top: !1,
            right: !1,
            bottom: !1,
            left: !1
        },
            o = e.getBoundingClientRect(),
            a = e === document.body ? Math.max(o.bottom, window.innerHeight) : o.bottom,
            s = e.scrollLeft,
            r = e.scrollTop,
            l = t.left - s,
            u = t.top - r;
        return (l < o.left + n || l < n) && (i.left = !0), (l + t.width > o.right - n || l + t.width > window.innerWidth - n) && (i.right = !0), (u < o.top + n || u < n) && (i.top = !0), (u + t.height > a - n || u + t.height > window.innerHeight - n) && (i.bottom = !0), i
    }, M.checkPossibleAlignments = function (e, t, n, i) {
        var o = {
            top: !0,
            right: !0,
            bottom: !0,
            left: !0,
            spaceOnTop: null,
            spaceOnRight: null,
            spaceOnBottom: null,
            spaceOnLeft: null
        },
            a = "visible" === getComputedStyle(t).overflow,
            s = t.getBoundingClientRect(),
            r = Math.min(s.height, window.innerHeight),
            l = Math.min(s.width, window.innerWidth),
            u = e.getBoundingClientRect(),
            d = t.scrollLeft,
            c = t.scrollTop,
            h = n.left - d,
            p = n.top - c,
            f = n.top + u.height - c;
        return o.spaceOnRight = a ? window.innerWidth - (u.left + n.width) : l - (h + n.width), o.spaceOnRight < 0 && (o.left = !1), o.spaceOnLeft = a ? u.right - n.width : h - n.width + u.width, o.spaceOnLeft < 0 && (o.right = !1), o.spaceOnBottom = a ? window.innerHeight - (u.top + n.height + i) : r - (p + n.height + i), o.spaceOnBottom < 0 && (o.top = !1), o.spaceOnTop = a ? u.bottom - (n.height + i) : f - (n.height - i), o.spaceOnTop < 0 && (o.bottom = !1), o
    }, M.getOverflowParent = function (e) {
        return null == e ? null : e === document.body || "visible" !== getComputedStyle(e).overflow ? e : M.getOverflowParent(e.parentElement)
    }, M.getIdFromTrigger = function (e) {
        var t = e.getAttribute("data-target");
        return t || (t = (t = e.getAttribute("href")) ? t.slice(1) : ""), t
    }, M.getDocumentScrollTop = function () {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }, M.getDocumentScrollLeft = function () {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
var getTime = Date.now || function () {
    return (new Date).getTime()
};
M.throttle = function (n, i, o) {
    var a = void 0,
        s = void 0,
        r = void 0,
        l = null,
        u = 0;
    o || (o = {});
    var d = function () {
        u = !1 === o.leading ? 0 : getTime(), l = null, r = n.apply(a, s), a = s = null
    };
    return function () {
        var e = getTime();
        u || !1 !== o.leading || (u = e);
        var t = i - (e - u);
        return a = this, s = arguments, t <= 0 ? (clearTimeout(l), l = null, u = e, r = n.apply(a, s), a = s = null) : l || !1 === o.trailing || (l = setTimeout(d, t)), r
    }
};
var $jscomp = {
    scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, t, n) {
    if (n.get || n.set) throw new TypeError("ES3 does not support getters and setters.");
    e != Array.prototype && e != Object.prototype && (e[t] = n.value)
}, $jscomp.getGlobal = function (e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
}, $jscomp.global = $jscomp.getGlobal(this), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () { }, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}, $jscomp.symbolCounter_ = 0, $jscomp.Symbol = function (e) {
    return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++
}, $jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    }), $jscomp.initSymbolIterator = function () { }
}, $jscomp.arrayIterator = function (e) {
    var t = 0;
    return $jscomp.iteratorPrototype(function () {
        return t < e.length ? {
            done: !1,
            value: e[t++]
        } : {
                done: !0
            }
    })
}, $jscomp.iteratorPrototype = function (e) {
    return $jscomp.initSymbolIterator(), (e = {
        next: e
    })[$jscomp.global.Symbol.iterator] = function () {
        return this
    }, e
}, $jscomp.array = $jscomp.array || {}, $jscomp.iteratorFromArray = function (t, n) {
    $jscomp.initSymbolIterator(), t instanceof String && (t += "");
    var i = 0,
        o = {
            next: function () {
                if (i < t.length) {
                    var e = i++;
                    return {
                        value: n(e, t[e]),
                        done: !1
                    }
                }
                return o.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                }, o.next()
            }
        };
    return o[Symbol.iterator] = function () {
        return o
    }, o
}, $jscomp.polyfill = function (e, t, n, i) {
    if (t) {
        for (n = $jscomp.global, e = e.split("."), i = 0; i < e.length - 1; i++) {
            var o = e[i];
            o in n || (n[o] = {}), n = n[o]
        } (t = t(i = n[e = e[e.length - 1]])) != i && null != t && $jscomp.defineProperty(n, e, {
            configurable: !0,
            writable: !0,
            value: t
        })
    }
}, $jscomp.polyfill("Array.prototype.keys", function (e) {
    return e || function () {
        return $jscomp.iteratorFromArray(this, function (e) {
            return e
        })
    }
}, "es6-impl", "es3");
var $jscomp$this = this;
! function (e) {
    M.anime = e()
}(function () {
    function o(e) {
        if (!F.col(e)) try {
            return document.querySelectorAll(e)
        } catch (c) { }
    }

    function w(e, t) {
        for (var n = e.length, i = 2 <= arguments.length ? t : void 0, o = [], a = 0; a < n; a++)
            if (a in e) {
                var s = e[a];
                t.call(i, s, a, e) && o.push(s)
            }
        return o
    }

    function n(e) {
        return e.reduce(function (e, t) {
            return e.concat(F.arr(t) ? n(t) : t)
        }, [])
    }

    function a(e) {
        return F.arr(e) ? e : (F.str(e) && (e = o(e) || e), e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e])
    }

    function s(e, t) {
        return e.some(function (e) {
            return e === t
        })
    }

    function r(e) {
        var t, n = {};
        for (t in e) n[t] = e[t];
        return n
    }

    function l(e, t) {
        var n, i = r(e);
        for (n in e) i[n] = t.hasOwnProperty(n) ? t[n] : e[n];
        return i
    }

    function u(e, t) {
        var n, i = r(e);
        for (n in t) i[n] = F.und(e[n]) ? t[n] : e[n];
        return i
    }

    function d(e) {
        e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, i) {
            return t + t + n + n + i + i
        });
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return "rgba(" + (e = parseInt(t[1], 16)) + "," + parseInt(t[2], 16) + "," + (t = parseInt(t[3], 16)) + ",1)"
    }

    function h(e) {
        function t(e, t, n) {
            return n < 0 && (n += 1), 1 < n && --n, n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
        }
        var n = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e);
        e = parseInt(n[1]) / 360;
        var i = parseInt(n[2]) / 100,
            o = parseInt(n[3]) / 100;
        n = n[4] || 1;
        if (0 == i) o = i = e = o;
        else {
            var a = o < .5 ? o * (1 + i) : o + i - o * i,
                s = 2 * o - a;
            o = t(s, a, e + 1 / 3), i = t(s, a, e);
            e = t(s, a, e - 1 / 3)
        }
        return "rgba(" + 255 * o + "," + 255 * i + "," + 255 * e + "," + n + ")"
    }

    function p(e) {
        if (e = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e)) return e[2]
    }

    function f(e) {
        return -1 < e.indexOf("translate") || "perspective" === e ? "px" : -1 < e.indexOf("rotate") || -1 < e.indexOf("skew") ? "deg" : void 0
    }

    function m(e, t) {
        return F.fnc(e) ? e(t.target, t.id, t.total) : e
    }

    function x(e, t) {
        if (t in e.style) return getComputedStyle(e).getPropertyValue(t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0"
    }

    function v(e, t) {
        return F.dom(e) && s(H, t) ? "transform" : F.dom(e) && (e.getAttribute(t) || F.svg(e) && e[t]) ? "attribute" : F.dom(e) && "transform" !== t && x(e, t) ? "css" : null != e[t] ? "object" : void 0
    }

    function i(e, n) {
        var t = f(n);
        t = -1 < n.indexOf("scale") ? 1 : 0 + t;
        if (!(e = e.style.transform)) return t;
        for (var i = [], o = [], a = [], s = /(\w+)\((.+?)\)/g; i = s.exec(e);) o.push(i[1]), a.push(i[2]);
        return (e = w(a, function (e, t) {
            return o[t] === n
        })).length ? e[0] : t
    }

    function g(e, t) {
        switch (v(e, t)) {
            case "transform":
                return i(e, t);
            case "css":
                return x(e, t);
            case "attribute":
                return e.getAttribute(t)
        }
        return e[t] || 0
    }

    function y(e, t) {
        var n = /^(\*=|\+=|-=)/.exec(e);
        if (!n) return e;
        var i = p(e) || 0;
        switch (t = parseFloat(t), e = parseFloat(e.replace(n[0], "")), n[0][0]) {
            case "+":
                return t + e + i;
            case "-":
                return t - e + i;
            case "*":
                return t * e + i
        }
    }

    function b(e, t) {
        return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
    }

    function _(e) {
        e = e.points;
        for (var t, n = 0, i = 0; i < e.numberOfItems; i++) {
            var o = e.getItem(i);
            0 < i && (n += b(t, o)), t = o
        }
        return n
    }

    function C(e) {
        if (e.getTotalLength) return e.getTotalLength();
        switch (e.tagName.toLowerCase()) {
            case "circle":
                return 2 * Math.PI * e.getAttribute("r");
            case "rect":
                return 2 * e.getAttribute("width") + 2 * e.getAttribute("height");
            case "line":
                return b({
                    x: e.getAttribute("x1"),
                    y: e.getAttribute("y1")
                }, {
                        x: e.getAttribute("x2"),
                        y: e.getAttribute("y2")
                    });
            case "polyline":
                return _(e);
            case "polygon":
                var t = e.points;
                return _(e) + b(t.getItem(t.numberOfItems - 1), t.getItem(0))
        }
    }

    function k(t, n) {
        function e(e) {
            return e = void 0 === e ? 0 : e, t.el.getPointAtLength(1 <= n + e ? n + e : 0)
        }
        var i = e(),
            o = e(-1),
            a = e(1);
        switch (t.property) {
            case "x":
                return i.x;
            case "y":
                return i.y;
            case "angle":
                return 180 * Math.atan2(a.y - o.y, a.x - o.x) / Math.PI
        }
    }

    function E(e, t) {
        var n, i = /-?\d*\.?\d+/g;
        if (n = F.pth(e) ? e.totalLength : e, F.col(n))
            if (F.rgb(n)) {
                var o = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n);
                n = o ? "rgba(" + o[1] + ",1)" : n
            } else n = F.hex(n) ? d(n) : F.hsl(n) ? h(n) : void 0;
        else o = (o = p(n)) ? n.substr(0, n.length - o.length) : n, n = t && !/\s/g.test(n) ? o + t : o;
        return {
            original: n += "",
            numbers: n.match(i) ? n.match(i).map(Number) : [0],
            strings: F.str(e) || t ? n.split(i) : []
        }
    }

    function T(e) {
        return w(e = e ? n(F.arr(e) ? e.map(a) : a(e)) : [], function (e, t, n) {
            return n.indexOf(e) === t
        })
    }

    function M(e) {
        var n = T(e);
        return n.map(function (e, t) {
            return {
                target: e,
                id: t,
                total: n.length
            }
        })
    }

    function S(e, n) {
        var t = r(n);
        if (F.arr(e)) {
            var i = e.length;
            2 !== i || F.obj(e[0]) ? F.fnc(n.duration) || (t.duration = n.duration / i) : e = {
                value: e
            }
        }
        return a(e).map(function (e, t) {
            return t = t ? 0 : n.delay, e = F.obj(e) && !F.pth(e) ? e : {
                value: e
            }, F.und(e.delay) && (e.delay = t), e
        }).map(function (e) {
            return u(e, t)
        })
    }

    function L(e, t) {
        var n, i = {};
        for (n in e) {
            var o = m(e[n], t);
            F.arr(o) && (1 === (o = o.map(function (e) {
                return m(e, t)
            })).length && (o = o[0])), i[n] = o
        }
        return i.duration = parseFloat(i.duration), i.delay = parseFloat(i.delay), i
    }

    function D(e) {
        return F.arr(e) ? j.apply(this, e) : t[e]
    }

    function O(a, s) {
        var r;
        return a.tweens.map(function (e) {
            var t = (e = L(e, s)).value,
                n = g(s.target, a.name),
                i = r ? r.to.original : n,
                o = (i = F.arr(t) ? t[0] : i, y(F.arr(t) ? t[1] : t, i));
            n = p(o) || p(i) || p(n);
            return e.from = E(i, n), e.to = E(o, n), e.start = r ? r.end : a.offset, e.end = e.start + e.delay + e.duration, e.easing = D(e.easing), e.elasticity = (1e3 - Math.min(Math.max(e.elasticity, 1), 999)) / 1e3, e.isPath = F.pth(t), e.isColor = F.col(e.from.original), e.isColor && (e.round = 1), r = e
        })
    }

    function $(e, t) {
        return w(n(e.map(function (i) {
            return t.map(function (e) {
                var t = v(i.target, e.name);
                if (t) {
                    var n = O(e, i);
                    e = {
                        type: t,
                        property: e.name,
                        animatable: i,
                        tweens: n,
                        duration: n[n.length - 1].end,
                        delay: n[0].delay
                    }
                } else e = void 0;
                return e
            })
        })), function (e) {
            return !F.und(e)
        })
    }

    function A(t, e, n, i) {
        var o = "delay" === t;
        return e.length ? (o ? Math.min : Math.max).apply(Math, e.map(function (e) {
            return e[t]
        })) : o ? i.delay : n.offset + i.delay + i.duration
    }

    function B(e) {
        var t, n = l(P, e),
            i = l(N, e),
            o = M(e.targets),
            a = [],
            s = u(n, i);
        for (t in e) s.hasOwnProperty(t) || "targets" === t || a.push({
            name: t,
            offset: s.offset,
            tweens: S(e[t], i)
        });
        return u(n, {
            children: [],
            animatables: o,
            animations: e = $(o, a),
            duration: A("duration", e, n, i),
            delay: A("delay", e, n, i)
        })
    }

    function I(e) {
        function d() {
            return window.Promise && new Promise(function (e) {
                return y = e
            })
        }

        function c(e) {
            return _.reversed ? _.duration - e : e
        }

        function h(t) {
            for (var e = 0, n = {}, i = _.animations, o = i.length; e < o;) {
                var a = i[e],
                    s = a.animatable,
                    r = (l = a.tweens)[c = l.length - 1];
                c && (r = w(l, function (e) {
                    return t < e.end
                })[0] || r);
                for (var l = Math.min(Math.max(t - r.start - r.delay, 0), r.duration) / r.duration, u = isNaN(l) ? 1 : r.easing(l, r.elasticity), d = (l = r.to.strings, r.round), c = [], h = void 0, p = (h = r.to.numbers.length, 0); p < h; p++) {
                    var f = void 0,
                        m = (f = r.to.numbers[p], r.from.numbers[p]);
                    f = r.isPath ? k(r.value, u * f) : m + u * (f - m);
                    d && (r.isColor && 2 < p || (f = Math.round(f * d) / d)), c.push(f)
                }
                if (r = l.length)
                    for (h = l[0], u = 0; u < r; u++) d = l[u + 1], p = c[u], isNaN(p) || (h = d ? h + (p + d) : h + (p + " "));
                else h = c[0];
                W[a.type](s.target, a.property, h, n, s.id), a.currentValue = h, e++
            }
            if (e = Object.keys(n).length)
                for (i = 0; i < e; i++) R || (R = x(document.body, "transform") ? "transform" : "-webkit-transform"), _.animatables[i].target.style[R] = n[i].join(" ");
            _.currentTime = t, _.progress = t / _.duration * 100
        }

        function p(e) {
            _[e] && _[e](_)
        }

        function f() {
            _.remaining && !0 !== _.remaining && _.remaining--
        }

        function t(e) {
            var t = _.duration,
                n = _.offset,
                i = n + _.delay,
                o = _.currentTime,
                a = _.reversed,
                s = c(e);
            if (_.children.length) {
                var r = _.children,
                    l = r.length;
                if (s >= _.currentTime)
                    for (var u = 0; u < l; u++) r[u].seek(s);
                else
                    for (; l--;) r[l].seek(s)
            } (i <= s || !t) && (_.began || (_.began = !0, p("begin")), p("run")), n < s && s < t ? h(s) : (s <= n && 0 !== o && (h(0), a && f()), (t <= s && o !== t || !t) && (h(t), a || f())), p("update"), t <= e && (_.remaining ? (v = m, "alternate" === _.direction && (_.reversed = !_.reversed)) : (_.pause(), _.completed || (_.completed = !0, p("complete"), "Promise" in window && (y(), b = d()))), g = 0)
        }
        e = void 0 === e ? {} : e;
        var m, v, g = 0,
            y = null,
            b = d(),
            _ = B(e);
        return _.reset = function () {
            var e = _.direction,
                t = _.loop;
            for (_.currentTime = 0, _.progress = 0, _.paused = !0, _.began = !1, _.completed = !1, _.reversed = "reverse" === e, _.remaining = "alternate" === e && 1 === t ? 2 : t, h(0), e = _.children.length; e--;) _.children[e].reset()
        }, _.tick = function (e) {
            m = e, v || (v = m), t((g + m - v) * I.speed)
        }, _.seek = function (e) {
            t(c(e))
        }, _.pause = function () {
            var e = q.indexOf(_); - 1 < e && q.splice(e, 1), _.paused = !0
        }, _.play = function () {
            _.paused && (_.paused = !1, v = 0, g = c(_.currentTime), q.push(_), z || X())
        }, _.reverse = function () {
            _.reversed = !_.reversed, v = 0, g = c(_.currentTime)
        }, _.restart = function () {
            _.pause(), _.reset(), _.play()
        }, _.finished = b, _.reset(), _.autoplay && _.play(), _
    }
    var R, P = {
        update: void 0,
        begin: void 0,
        run: void 0,
        complete: void 0,
        loop: 1,
        direction: "normal",
        autoplay: !0,
        offset: 0
    },
        N = {
            duration: 1e3,
            delay: 0,
            easing: "easeOutElastic",
            elasticity: 500,
            round: 0
        },
        H = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),
        F = {
            arr: function (e) {
                return Array.isArray(e)
            },
            obj: function (e) {
                return -1 < Object.prototype.toString.call(e).indexOf("Object")
            },
            pth: function (e) {
                return F.obj(e) && e.hasOwnProperty("totalLength")
            },
            svg: function (e) {
                return e instanceof SVGElement
            },
            dom: function (e) {
                return e.nodeType || F.svg(e)
            },
            str: function (e) {
                return "string" == typeof e
            },
            fnc: function (e) {
                return "function" == typeof e
            },
            und: function (e) {
                return void 0 === e
            },
            hex: function (e) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)
            },
            rgb: function (e) {
                return /^rgb/.test(e)
            },
            hsl: function (e) {
                return /^hsl/.test(e)
            },
            col: function (e) {
                return F.hex(e) || F.rgb(e) || F.hsl(e)
            }
        },
        j = function () {
            function c(e, t, n) {
                return (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e
            }
            return function (s, r, l, u) {
                if (0 <= s && s <= 1 && 0 <= l && l <= 1) {
                    var d = new Float32Array(11);
                    if (s !== r || l !== u)
                        for (var e = 0; e < 11; ++e) d[e] = c(.1 * e, s, l);
                    return function (e) {
                        if (s === r && l === u) return e;
                        if (0 === e) return 0;
                        if (1 === e) return 1;
                        for (var t = 0, n = 1; 10 !== n && d[n] <= e; ++n) t += .1;
                        n = t + (e - d[--n]) / (d[n + 1] - d[n]) * .1;
                        var i = 3 * (1 - 3 * l + 3 * s) * n * n + 2 * (3 * l - 6 * s) * n + 3 * s;
                        if (.001 <= i) {
                            for (t = 0; t < 4 && 0 !== (i = 3 * (1 - 3 * l + 3 * s) * n * n + 2 * (3 * l - 6 * s) * n + 3 * s); ++t) {
                                var o = c(n, s, l) - e;
                                n = n - o / i
                            }
                            e = n
                        } else if (0 === i) e = n;
                        else {
                            n = t, t = t + .1;
                            for (var a = 0; 0 < (i = c(o = n + (t - n) / 2, s, l) - e) ? t = o : n = o, 1e-7 < Math.abs(i) && ++a < 10;);
                            e = o
                        }
                        return c(e, r, u)
                    }
                }
            }
        }(),
        t = function () {
            function n(e, t) {
                return 0 === e || 1 === e ? e : -Math.pow(2, 10 * (e - 1)) * Math.sin(2 * (e - 1 - t / (2 * Math.PI) * Math.asin(1)) * Math.PI / t)
            }
            var e, i = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
                t = {
                    In: [
                        [.55, .085, .68, .53],
                        [.55, .055, .675, .19],
                        [.895, .03, .685, .22],
                        [.755, .05, .855, .06],
                        [.47, 0, .745, .715],
                        [.95, .05, .795, .035],
                        [.6, .04, .98, .335],
                        [.6, -.28, .735, .045], n
                    ],
                    Out: [
                        [.25, .46, .45, .94],
                        [.215, .61, .355, 1],
                        [.165, .84, .44, 1],
                        [.23, 1, .32, 1],
                        [.39, .575, .565, 1],
                        [.19, 1, .22, 1],
                        [.075, .82, .165, 1],
                        [.175, .885, .32, 1.275],
                        function (e, t) {
                            return 1 - n(1 - e, t)
                        }
                    ],
                    InOut: [
                        [.455, .03, .515, .955],
                        [.645, .045, .355, 1],
                        [.77, 0, .175, 1],
                        [.86, 0, .07, 1],
                        [.445, .05, .55, .95],
                        [1, 0, 0, 1],
                        [.785, .135, .15, .86],
                        [.68, -.55, .265, 1.55],
                        function (e, t) {
                            return e < .5 ? n(2 * e, t) / 2 : 1 - n(-2 * e + 2, t) / 2
                        }
                    ]
                },
                o = {
                    linear: j(.25, .25, .75, .75)
                },
                a = {};
            for (e in t) a.type = e, t[a.type].forEach(function (n) {
                return function (e, t) {
                    o["ease" + n.type + i[t]] = F.fnc(e) ? e : j.apply($jscomp$this, e)
                }
            }(a)), a = {
                type: a.type
            };
            return o
        }(),
        W = {
            css: function (e, t, n) {
                return e.style[t] = n
            },
            attribute: function (e, t, n) {
                return e.setAttribute(t, n)
            },
            object: function (e, t, n) {
                return e[t] = n
            },
            transform: function (e, t, n, i, o) {
                i[o] || (i[o] = []), i[o].push(t + "(" + n + ")")
            }
        },
        q = [],
        z = 0,
        X = function () {
            function i() {
                z = requestAnimationFrame(e)
            }

            function e(e) {
                var t = q.length;
                if (t) {
                    for (var n = 0; n < t;) q[n] && q[n].tick(e), n++;
                    i()
                } else cancelAnimationFrame(z), z = 0
            }
            return i
        }();
    return I.version = "2.2.0", I.speed = 1, I.running = q, I.remove = function (e) {
        e = T(e);
        for (var t = q.length; t--;)
            for (var n = q[t], i = n.animations, o = i.length; o--;) s(e, i[o].animatable.target) && (i.splice(o, 1), i.length || n.pause())
    }, I.getValue = g, I.path = function (e, t) {
        var n = F.str(e) ? o(e)[0] : e,
            i = t || 100;
        return function (e) {
            return {
                el: n,
                property: e,
                totalLength: C(n) * (i / 100)
            }
        }
    }, I.setDashoffset = function (e) {
        var t = C(e);
        return e.setAttribute("stroke-dasharray", t), t
    }, I.bezier = j, I.easings = t, I.timeline = function (i) {
        var o = I(i);
        return o.pause(), o.duration = 0, o.add = function (e) {
            return o.children.forEach(function (e) {
                e.began = !0, e.completed = !0
            }), a(e).forEach(function (e) {
                var t = u(e, l(N, i || {}));
                t.targets = t.targets || i.targets, e = o.duration;
                var n = t.offset;
                t.autoplay = !1, t.direction = o.direction, t.offset = F.und(n) ? e : y(n, e), o.began = !0, o.completed = !0, o.seek(t.offset), (t = I(t)).began = !0, t.completed = !0, t.duration > e && (o.duration = t.duration), o.children.push(t)
            }), o.seek(0), o.reset(), o.autoplay && o.restart(), o
        }, o
    }, I.random = function (e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }, I
}),
    function (r, l) {
        "use strict";
        var e = {
            accordion: !0,
            onOpenStart: undefined,
            onOpenEnd: undefined,
            onCloseStart: undefined,
            onCloseEnd: undefined,
            inDuration: 300,
            outDuration: 300
        },
            t = function () {
                function o(e, t) {
                    _classCallCheck(this, o);
                    var n = _possibleConstructorReturn(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, o, e, t));
                    (n.el.M_Collapsible = n).options = r.extend({}, o.defaults, t), n.$headers = n.$el.children("li").children(".collapsible-header"), n.$headers.attr("tabindex", 0), n._setupEventHandlers();
                    var i = n.$el.children("li.active").children(".collapsible-body");
                    return n.options.accordion ? i.first().css("display", "block") : i.css("display", "block"), n
                }
                return _inherits(o, Component), _createClass(o, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.el.M_Collapsible = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        var t = this;
                        this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this), this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this), this.el.addEventListener("click", this._handleCollapsibleClickBound), this.$headers.each(function (e) {
                            e.addEventListener("keydown", t._handleCollapsibleKeydownBound)
                        })
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        var t = this;
                        this.el.removeEventListener("click", this._handleCollapsibleClickBound), this.$headers.each(function (e) {
                            e.removeEventListener("keydown", t._handleCollapsibleKeydownBound)
                        })
                    }
                }, {
                    key: "_handleCollapsibleClick",
                    value: function (e) {
                        var t = r(e.target).closest(".collapsible-header");
                        if (e.target && t.length) {
                            var n = t.closest(".collapsible");
                            if (n[0] === this.el) {
                                var i = t.closest("li"),
                                    o = n.children("li"),
                                    a = i[0].classList.contains("active"),
                                    s = o.index(i);
                                a ? this.close(s) : this.open(s)
                            }
                        }
                    }
                }, {
                    key: "_handleCollapsibleKeydown",
                    value: function (e) {
                        13 === e.keyCode && this._handleCollapsibleClickBound(e)
                    }
                }, {
                    key: "_animateIn",
                    value: function (e) {
                        var t = this,
                            n = this.$el.children("li").eq(e);
                        if (n.length) {
                            var i = n.children(".collapsible-body");
                            l.remove(i[0]), i.css({
                                display: "block",
                                overflow: "hidden",
                                height: 0,
                                paddingTop: "",
                                paddingBottom: ""
                            });
                            var o = i.css("padding-top"),
                                a = i.css("padding-bottom"),
                                s = i[0].scrollHeight;
                            i.css({
                                paddingTop: 0,
                                paddingBottom: 0
                            }), l({
                                targets: i[0],
                                height: s,
                                paddingTop: o,
                                paddingBottom: a,
                                duration: this.options.inDuration,
                                easing: "easeInOutCubic",
                                complete: function () {
                                    i.css({
                                        overflow: "",
                                        paddingTop: "",
                                        paddingBottom: "",
                                        height: ""
                                    }), "function" == typeof t.options.onOpenEnd && t.options.onOpenEnd.call(t, n[0])
                                }
                            })
                        }
                    }
                }, {
                    key: "_animateOut",
                    value: function (e) {
                        var t = this,
                            n = this.$el.children("li").eq(e);
                        if (n.length) {
                            var i = n.children(".collapsible-body");
                            l.remove(i[0]), i.css("overflow", "hidden"), l({
                                targets: i[0],
                                height: 0,
                                paddingTop: 0,
                                paddingBottom: 0,
                                duration: this.options.outDuration,
                                easing: "easeInOutCubic",
                                complete: function () {
                                    i.css({
                                        height: "",
                                        overflow: "",
                                        padding: "",
                                        display: ""
                                    }), "function" == typeof t.options.onCloseEnd && t.options.onCloseEnd.call(t, n[0])
                                }
                            })
                        }
                    }
                }, {
                    key: "open",
                    value: function (e) {
                        var n = this,
                            t = this.$el.children("li").eq(e);
                        if (t.length && !t[0].classList.contains("active")) {
                            if ("function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, t[0]), this.options.accordion) {
                                var i = this.$el.children("li");
                                this.$el.children("li.active").each(function (e) {
                                    var t = i.index(r(e));
                                    n.close(t)
                                })
                            }
                            t[0].classList.add("active"), this._animateIn(e)
                        }
                    }
                }, {
                    key: "close",
                    value: function (e) {
                        var t = this.$el.children("li").eq(e);
                        t.length && t[0].classList.contains("active") && ("function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, t[0]), t[0].classList.remove("active"), this._animateOut(e))
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(o.__proto__ || Object.getPrototypeOf(o), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Collapsible
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), o
            }();
        M.Collapsible = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "collapsible", "M_Collapsible")
    }(cash, M.anime),
    function (u, t) {
        "use strict";
        var e = {
            alignment: "left",
            autoFocus: !0,
            constrainWidth: !0,
            container: null,
            coverTrigger: !0,
            closeOnClick: !0,
            hover: !1,
            inDuration: 150,
            outDuration: 250,
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            onItemClick: null
        },
            n = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return n.el.M_Dropdown = n, i._dropdowns.push(n), n.id = M.getIdFromTrigger(e), n.dropdownEl = document.getElementById(n.id), n.$dropdownEl = u(n.dropdownEl), n.options = u.extend({}, i.defaults, t), n.isOpen = !1, n.isScrollable = !1, n.isTouchMoving = !1, n.focusedIndex = -1, n.filterQuery = [], n.options.container ? u(n.options.container).append(n.dropdownEl) : n.$el.after(n.dropdownEl), n._makeDropdownFocusable(), n._resetFilterQueryBound = n._resetFilterQuery.bind(n), n._handleDocumentClickBound = n._handleDocumentClick.bind(n), n._handleDocumentTouchmoveBound = n._handleDocumentTouchmove.bind(n), n._handleDropdownClickBound = n._handleDropdownClick.bind(n), n._handleDropdownKeydownBound = n._handleDropdownKeydown.bind(n), n._handleTriggerKeydownBound = n._handleTriggerKeydown.bind(n), n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._resetDropdownStyles(), this._removeEventHandlers(), i._dropdowns.splice(i._dropdowns.indexOf(this), 1), this.el.M_Dropdown = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this.el.addEventListener("keydown", this._handleTriggerKeydownBound), this.dropdownEl.addEventListener("click", this._handleDropdownClickBound), this.options.hover ? (this._handleMouseEnterBound = this._handleMouseEnter.bind(this), this.el.addEventListener("mouseenter", this._handleMouseEnterBound), this._handleMouseLeaveBound = this._handleMouseLeave.bind(this), this.el.addEventListener("mouseleave", this._handleMouseLeaveBound), this.dropdownEl.addEventListener("mouseleave", this._handleMouseLeaveBound)) : (this._handleClickBound = this._handleClick.bind(this), this.el.addEventListener("click", this._handleClickBound))
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("keydown", this._handleTriggerKeydownBound), this.dropdownEl.removeEventListener("click", this._handleDropdownClickBound), this.options.hover ? (this.el.removeEventListener("mouseenter", this._handleMouseEnterBound), this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound), this.dropdownEl.removeEventListener("mouseleave", this._handleMouseLeaveBound)) : this.el.removeEventListener("click", this._handleClickBound)
                    }
                }, {
                    key: "_setupTemporaryEventHandlers",
                    value: function () {
                        document.body.addEventListener("click", this._handleDocumentClickBound, !0), document.body.addEventListener("touchend", this._handleDocumentClickBound), document.body.addEventListener("touchmove", this._handleDocumentTouchmoveBound), this.dropdownEl.addEventListener("keydown", this._handleDropdownKeydownBound)
                    }
                }, {
                    key: "_removeTemporaryEventHandlers",
                    value: function () {
                        document.body.removeEventListener("click", this._handleDocumentClickBound, !0), document.body.removeEventListener("touchend", this._handleDocumentClickBound), document.body.removeEventListener("touchmove", this._handleDocumentTouchmoveBound), this.dropdownEl.removeEventListener("keydown", this._handleDropdownKeydownBound)
                    }
                }, {
                    key: "_handleClick",
                    value: function (e) {
                        e.preventDefault(), this.open()
                    }
                }, {
                    key: "_handleMouseEnter",
                    value: function () {
                        this.open()
                    }
                }, {
                    key: "_handleMouseLeave",
                    value: function (e) {
                        var t = e.toElement || e.relatedTarget,
                            n = !!u(t).closest(".dropdown-content").length,
                            i = !1,
                            o = u(t).closest(".dropdown-trigger");
                        o.length && o[0].M_Dropdown && o[0].M_Dropdown.isOpen && (i = !0), i || n || this.close()
                    }
                }, {
                    key: "_handleDocumentClick",
                    value: function (e) {
                        var t = this,
                            n = u(e.target);
                        this.options.closeOnClick && n.closest(".dropdown-content").length && !this.isTouchMoving ? setTimeout(function () {
                            t.close()
                        }, 0) : !n.closest(".dropdown-trigger").length && n.closest(".dropdown-content").length || setTimeout(function () {
                            t.close()
                        }, 0), this.isTouchMoving = !1
                    }
                }, {
                    key: "_handleTriggerKeydown",
                    value: function (e) {
                        e.which !== M.keys.ARROW_DOWN && e.which !== M.keys.ENTER || this.isOpen || (e.preventDefault(), this.open())
                    }
                }, {
                    key: "_handleDocumentTouchmove",
                    value: function (e) {
                        u(e.target).closest(".dropdown-content").length && (this.isTouchMoving = !0)
                    }
                }, {
                    key: "_handleDropdownClick",
                    value: function (e) {
                        if ("function" == typeof this.options.onItemClick) {
                            var t = u(e.target).closest("li")[0];
                            this.options.onItemClick.call(this, t)
                        }
                    }
                }, {
                    key: "_handleDropdownKeydown",
                    value: function (e) {
                        if (e.which === M.keys.TAB) e.preventDefault(), this.close();
                        else if (e.which !== M.keys.ARROW_DOWN && e.which !== M.keys.ARROW_UP || !this.isOpen)
                            if (e.which === M.keys.ENTER && this.isOpen) {
                                var t = this.dropdownEl.children[this.focusedIndex],
                                    n = u(t).find("a, button").first();
                                n.length ? n[0].click() : t && t.click()
                            } else e.which === M.keys.ESC && this.isOpen && (e.preventDefault(), this.close());
                        else {
                            e.preventDefault();
                            var i = e.which === M.keys.ARROW_DOWN ? 1 : -1,
                                o = this.focusedIndex,
                                a = !1;
                            do {
                                if (o += i, this.dropdownEl.children[o] && -1 !== this.dropdownEl.children[o].tabIndex) {
                                    a = !0;
                                    break
                                }
                            } while (o < this.dropdownEl.children.length && 0 <= o);
                            a && (this.focusedIndex = o, this._focusFocusedItem())
                        }
                        var s = String.fromCharCode(e.which).toLowerCase();
                        if (s && -1 === [9, 13, 27, 38, 40].indexOf(e.which)) {
                            this.filterQuery.push(s);
                            var r = this.filterQuery.join(""),
                                l = u(this.dropdownEl).find("li").filter(function (e) {
                                    return 0 === u(e).text().toLowerCase().indexOf(r)
                                })[0];
                            l && (this.focusedIndex = u(l).index(), this._focusFocusedItem())
                        }
                        this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1e3)
                    }
                }, {
                    key: "_resetFilterQuery",
                    value: function () {
                        this.filterQuery = []
                    }
                }, {
                    key: "_resetDropdownStyles",
                    value: function () {
                        this.$dropdownEl.css({
                            display: "",
                            width: "",
                            height: "",
                            left: "",
                            top: "",
                            "transform-origin": "",
                            transform: "",
                            opacity: ""
                        })
                    }
                }, {
                    key: "_makeDropdownFocusable",
                    value: function () {
                        this.dropdownEl.tabIndex = 0, u(this.dropdownEl).children().each(function (e) {
                            e.getAttribute("tabindex") || e.setAttribute("tabindex", 0)
                        })
                    }
                }, {
                    key: "_focusFocusedItem",
                    value: function () {
                        0 <= this.focusedIndex && this.focusedIndex < this.dropdownEl.children.length && this.options.autoFocus && this.dropdownEl.children[this.focusedIndex].focus()
                    }
                }, {
                    key: "_getDropdownPosition",
                    value: function () {
                        this.el.offsetParent.getBoundingClientRect();
                        var e = this.el.getBoundingClientRect(),
                            t = this.dropdownEl.getBoundingClientRect(),
                            n = t.height,
                            i = t.width,
                            o = e.left - t.left,
                            a = e.top - t.top,
                            s = {
                                left: o,
                                top: a,
                                height: n,
                                width: i
                            },
                            r = this.dropdownEl.offsetParent ? this.dropdownEl.offsetParent : this.dropdownEl.parentNode,
                            l = M.checkPossibleAlignments(this.el, r, s, this.options.coverTrigger ? 0 : e.height),
                            u = "top",
                            d = this.options.alignment;
                        if (a += this.options.coverTrigger ? 0 : e.height, this.isScrollable = !1, l.top || (l.bottom ? u = "bottom" : (this.isScrollable = !0, l.spaceOnTop > l.spaceOnBottom ? (u = "bottom", n += l.spaceOnTop, a -= l.spaceOnTop) : n += l.spaceOnBottom)), !l[d]) {
                            var c = "left" === d ? "right" : "left";
                            l[c] ? d = c : l.spaceOnLeft > l.spaceOnRight ? (d = "right", i += l.spaceOnLeft, o -= l.spaceOnLeft) : (d = "left", i += l.spaceOnRight)
                        }
                        return "bottom" === u && (a = a - t.height + (this.options.coverTrigger ? e.height : 0)), "right" === d && (o = o - t.width + e.width), {
                            x: o,
                            y: a,
                            verticalAlignment: u,
                            horizontalAlignment: d,
                            height: n,
                            width: i
                        }
                    }
                }, {
                    key: "_animateIn",
                    value: function () {
                        var e = this;
                        t.remove(this.dropdownEl), t({
                            targets: this.dropdownEl,
                            opacity: {
                                value: [0, 1],
                                easing: "easeOutQuad"
                            },
                            scaleX: [.3, 1],
                            scaleY: [.3, 1],
                            duration: this.options.inDuration,
                            easing: "easeOutQuint",
                            complete: function () {
                                e.options.autoFocus && e.dropdownEl.focus(), "function" == typeof e.options.onOpenEnd && e.options.onOpenEnd.call(e, e.el)
                            }
                        })
                    }
                }, {
                    key: "_animateOut",
                    value: function () {
                        var e = this;
                        t.remove(this.dropdownEl), t({
                            targets: this.dropdownEl,
                            opacity: {
                                value: 0,
                                easing: "easeOutQuint"
                            },
                            scaleX: .3,
                            scaleY: .3,
                            duration: this.options.outDuration,
                            easing: "easeOutQuint",
                            complete: function () {
                                e._resetDropdownStyles(), "function" == typeof e.options.onCloseEnd && e.options.onCloseEnd.call(e, e.el)
                            }
                        })
                    }
                }, {
                    key: "_placeDropdown",
                    value: function () {
                        var e = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
                        this.dropdownEl.style.width = e + "px";
                        var t = this._getDropdownPosition();
                        this.dropdownEl.style.left = t.x + "px", this.dropdownEl.style.top = t.y + "px", this.dropdownEl.style.height = t.height + "px", this.dropdownEl.style.width = t.width + "px", this.dropdownEl.style.transformOrigin = ("left" === t.horizontalAlignment ? "0" : "100%") + " " + ("top" === t.verticalAlignment ? "0" : "100%")
                    }
                }, {
                    key: "open",
                    value: function () {
                        this.isOpen || (this.isOpen = !0, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el), this._resetDropdownStyles(), this.dropdownEl.style.display = "block", this._placeDropdown(), this._animateIn(), this._setupTemporaryEventHandlers())
                    }
                }, {
                    key: "close",
                    value: function () {
                        this.isOpen && (this.isOpen = !1, this.focusedIndex = -1, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), this._animateOut(), this._removeTemporaryEventHandlers(), this.options.autoFocus && this.el.focus())
                    }
                }, {
                    key: "recalculateDimensions",
                    value: function () {
                        this.isOpen && (this.$dropdownEl.css({
                            width: "",
                            height: "",
                            left: "",
                            top: "",
                            "transform-origin": ""
                        }), this._placeDropdown())
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Dropdown
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        n._dropdowns = [], M.Dropdown = n, M.jQueryLoaded && M.initializeJqueryWrapper(n, "dropdown", "M_Dropdown")
    }(cash, M.anime),
    function (o, n) {
        "use strict";
        var e = {
            opacity: .5,
            inDuration: 250,
            outDuration: 250,
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            preventScrolling: !0,
            dismissible: !0,
            startingTop: "4%",
            endingTop: "10%"
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Modal = n).options = o.extend({}, i.defaults, t), n.isOpen = !1, n.id = n.$el.attr("id"), n._openingTrigger = undefined, n.$overlay = o('<div class="modal-overlay"></div>'), n.el.tabIndex = 0, n._nthModalOpened = 0, i._count++ , n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        i._count-- , this._removeEventHandlers(), this.el.removeAttribute("style"), this.$overlay.remove(), this.el.M_Modal = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleOverlayClickBound = this._handleOverlayClick.bind(this), this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this), 1 === i._count && document.body.addEventListener("click", this._handleTriggerClick), this.$overlay[0].addEventListener("click", this._handleOverlayClickBound), this.el.addEventListener("click", this._handleModalCloseClickBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        0 === i._count && document.body.removeEventListener("click", this._handleTriggerClick), this.$overlay[0].removeEventListener("click", this._handleOverlayClickBound), this.el.removeEventListener("click", this._handleModalCloseClickBound)
                    }
                }, {
                    key: "_handleTriggerClick",
                    value: function (e) {
                        var t = o(e.target).closest(".modal-trigger");
                        if (t.length) {
                            var n = M.getIdFromTrigger(t[0]),
                                i = document.getElementById(n).M_Modal;
                            i && i.open(t), e.preventDefault()
                        }
                    }
                }, {
                    key: "_handleOverlayClick",
                    value: function () {
                        this.options.dismissible && this.close()
                    }
                }, {
                    key: "_handleModalCloseClick",
                    value: function (e) {
                        o(e.target).closest(".modal-close").length && this.close()
                    }
                }, {
                    key: "_handleKeydown",
                    value: function (e) {
                        27 === e.keyCode && this.options.dismissible && this.close()
                    }
                }, {
                    key: "_handleFocus",
                    value: function (e) {
                        this.el.contains(e.target) || this._nthModalOpened !== i._modalsOpen || this.el.focus()
                    }
                }, {
                    key: "_animateIn",
                    value: function () {
                        var e = this;
                        o.extend(this.el.style, {
                            display: "block",
                            opacity: 0
                        }), o.extend(this.$overlay[0].style, {
                            display: "block",
                            opacity: 0
                        }), n({
                            targets: this.$overlay[0],
                            opacity: this.options.opacity,
                            duration: this.options.inDuration,
                            easing: "easeOutQuad"
                        });
                        var t = {
                            targets: this.el,
                            duration: this.options.inDuration,
                            easing: "easeOutCubic",
                            complete: function () {
                                "function" == typeof e.options.onOpenEnd && e.options.onOpenEnd.call(e, e.el, e._openingTrigger)
                            }
                        };
                        this.el.classList.contains("bottom-sheet") ? o.extend(t, {
                            bottom: 0,
                            opacity: 1
                        }) : o.extend(t, {
                            top: [this.options.startingTop, this.options.endingTop],
                            opacity: 1,
                            scaleX: [.8, 1],
                            scaleY: [.8, 1]
                        }), n(t)
                    }
                }, {
                    key: "_animateOut",
                    value: function () {
                        var e = this;
                        n({
                            targets: this.$overlay[0],
                            opacity: 0,
                            duration: this.options.outDuration,
                            easing: "easeOutQuart"
                        });
                        var t = {
                            targets: this.el,
                            duration: this.options.outDuration,
                            easing: "easeOutCubic",
                            complete: function () {
                                e.el.style.display = "none", e.$overlay.remove(), "function" == typeof e.options.onCloseEnd && e.options.onCloseEnd.call(e, e.el)
                            }
                        };
                        this.el.classList.contains("bottom-sheet") ? o.extend(t, {
                            bottom: "-100%",
                            opacity: 0
                        }) : o.extend(t, {
                            top: [this.options.endingTop, this.options.startingTop],
                            opacity: 0,
                            scaleX: .8,
                            scaleY: .8
                        }), n(t)
                    }
                }, {
                    key: "open",
                    value: function (e) {
                        if (!this.isOpen) return this.isOpen = !0, i._modalsOpen++ , this._nthModalOpened = i._modalsOpen, this.$overlay[0].style.zIndex = 1e3 + 2 * i._modalsOpen, this.el.style.zIndex = 1e3 + 2 * i._modalsOpen + 1, this._openingTrigger = e ? e[0] : undefined, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el, this._openingTrigger), this.options.preventScrolling && (document.body.style.overflow = "hidden"), this.el.classList.add("open"), this.el.insertAdjacentElement("afterend", this.$overlay[0]), this.options.dismissible && (this._handleKeydownBound = this._handleKeydown.bind(this), this._handleFocusBound = this._handleFocus.bind(this), document.addEventListener("keydown", this._handleKeydownBound), document.addEventListener("focus", this._handleFocusBound, !0)), n.remove(this.el), n.remove(this.$overlay[0]), this._animateIn(), this.el.focus(), this
                    }
                }, {
                    key: "close",
                    value: function () {
                        if (this.isOpen) return this.isOpen = !1, i._modalsOpen-- , this._nthModalOpened = 0, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), this.el.classList.remove("open"), 0 === i._modalsOpen && (document.body.style.overflow = ""), this.options.dismissible && (document.removeEventListener("keydown", this._handleKeydownBound), document.removeEventListener("focus", this._handleFocusBound, !0)), n.remove(this.el), n.remove(this.$overlay[0]), this._animateOut(), this
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Modal
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        t._modalsOpen = 0, t._count = 0, M.Modal = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "modal", "M_Modal")
    }(cash, M.anime),
    function (a, s) {
        "use strict";
        var e = {
            inDuration: 275,
            outDuration: 200,
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Materialbox = n).options = a.extend({}, i.defaults, t), n.overlayActive = !1, n.doneAnimating = !0, n.placeholder = a("<div></div>").addClass("material-placeholder"), n.originalWidth = 0, n.originalHeight = 0, n.originInlineStyles = n.$el.attr("style"), n.caption = n.el.getAttribute("data-caption") || "", n.$el.before(n.placeholder), n.placeholder.append(n.$el), n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.el.M_Materialbox = undefined, a(this.placeholder).after(this.el).remove(), this.$el.removeAttr("style")
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this), this.el.addEventListener("click", this._handleMaterialboxClickBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("click", this._handleMaterialboxClickBound)
                    }
                }, {
                    key: "_handleMaterialboxClick",
                    value: function () {
                        !1 === this.doneAnimating || this.overlayActive && this.doneAnimating ? this.close() : this.open()
                    }
                }, {
                    key: "_handleWindowScroll",
                    value: function () {
                        this.overlayActive && this.close()
                    }
                }, {
                    key: "_handleWindowResize",
                    value: function () {
                        this.overlayActive && this.close()
                    }
                }, {
                    key: "_handleWindowEscape",
                    value: function (e) {
                        27 === e.keyCode && this.doneAnimating && this.overlayActive && this.close()
                    }
                }, {
                    key: "_makeAncestorsOverflowVisible",
                    value: function () {
                        this.ancestorsChanged = a();
                        for (var e = this.placeholder[0].parentNode; null !== e && !a(e).is(document);) {
                            var t = a(e);
                            "visible" !== t.css("overflow") && (t.css("overflow", "visible"), this.ancestorsChanged === undefined ? this.ancestorsChanged = t : this.ancestorsChanged = this.ancestorsChanged.add(t)), e = e.parentNode
                        }
                    }
                }, {
                    key: "_animateImageIn",
                    value: function () {
                        var e = this,
                            t = {
                                targets: this.el,
                                height: [this.originalHeight, this.newHeight],
                                width: [this.originalWidth, this.newWidth],
                                left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
                                top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2,
                                duration: this.options.inDuration,
                                easing: "easeOutQuad",
                                complete: function () {
                                    e.doneAnimating = !0, "function" == typeof e.options.onOpenEnd && e.options.onOpenEnd.call(e, e.el)
                                }
                            };
                        this.maxWidth = this.$el.css("max-width"), this.maxHeight = this.$el.css("max-height"), "none" !== this.maxWidth && (t.maxWidth = this.newWidth), "none" !== this.maxHeight && (t.maxHeight = this.newHeight), s(t)
                    }
                }, {
                    key: "_animateImageOut",
                    value: function () {
                        var e = this,
                            t = {
                                targets: this.el,
                                width: this.originalWidth,
                                height: this.originalHeight,
                                left: 0,
                                top: 0,
                                duration: this.options.outDuration,
                                easing: "easeOutQuad",
                                complete: function () {
                                    e.placeholder.css({
                                        height: "",
                                        width: "",
                                        position: "",
                                        top: "",
                                        left: ""
                                    }), e.attrWidth && e.$el.attr("width", e.attrWidth), e.attrHeight && e.$el.attr("height", e.attrHeight), e.$el.removeAttr("style"), e.originInlineStyles && e.$el.attr("style", e.originInlineStyles), e.$el.removeClass("active"), e.doneAnimating = !0, e.ancestorsChanged.length && e.ancestorsChanged.css("overflow", ""), "function" == typeof e.options.onCloseEnd && e.options.onCloseEnd.call(e, e.el)
                                }
                            };
                        s(t)
                    }
                }, {
                    key: "_updateVars",
                    value: function () {
                        this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight, this.caption = this.el.getAttribute("data-caption") || ""
                    }
                }, {
                    key: "open",
                    value: function () {
                        var e = this;
                        this._updateVars(), this.originalWidth = this.el.getBoundingClientRect().width, this.originalHeight = this.el.getBoundingClientRect().height, this.doneAnimating = !1, this.$el.addClass("active"), this.overlayActive = !0, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el), this.placeholder.css({
                            width: this.placeholder[0].getBoundingClientRect().width + "px",
                            height: this.placeholder[0].getBoundingClientRect().height + "px",
                            position: "relative",
                            top: 0,
                            left: 0
                        }), this._makeAncestorsOverflowVisible(), this.$el.css({
                            position: "absolute",
                            "z-index": 1e3,
                            "will-change": "left, top, width, height"
                        }), this.attrWidth = this.$el.attr("width"), this.attrHeight = this.$el.attr("height"), this.attrWidth && (this.$el.css("width", this.attrWidth + "px"), this.$el.removeAttr("width")), this.attrHeight && (this.$el.css("width", this.attrHeight + "px"), this.$el.removeAttr("height")), this.$overlay = a('<div id="materialbox-overlay"></div>').css({
                            opacity: 0
                        }).one("click", function () {
                            e.doneAnimating && e.close()
                        }), this.$el.before(this.$overlay);
                        var t = this.$overlay[0].getBoundingClientRect();
                        this.$overlay.css({
                            width: this.windowWidth + "px",
                            height: this.windowHeight + "px",
                            left: -1 * t.left + "px",
                            top: -1 * t.top + "px"
                        }), s.remove(this.el), s.remove(this.$overlay[0]), s({
                            targets: this.$overlay[0],
                            opacity: 1,
                            duration: this.options.inDuration,
                            easing: "easeOutQuad"
                        }), "" !== this.caption && (this.$photocaption && s.remove(this.$photoCaption[0]), this.$photoCaption = a('<div class="materialbox-caption"></div>'), this.$photoCaption.text(this.caption), a("body").append(this.$photoCaption), this.$photoCaption.css({
                            display: "inline"
                        }), s({
                            targets: this.$photoCaption[0],
                            opacity: 1,
                            duration: this.options.inDuration,
                            easing: "easeOutQuad"
                        }));
                        var n = 0,
                            i = this.originalWidth / this.windowWidth,
                            o = this.originalHeight / this.windowHeight;
                        this.newWidth = 0, this.newHeight = 0, o < i ? (n = this.originalHeight / this.originalWidth, this.newWidth = .9 * this.windowWidth, this.newHeight = .9 * this.windowWidth * n) : (n = this.originalWidth / this.originalHeight, this.newWidth = .9 * this.windowHeight * n, this.newHeight = .9 * this.windowHeight), this._animateImageIn(), this._handleWindowScrollBound = this._handleWindowScroll.bind(this), this._handleWindowResizeBound = this._handleWindowResize.bind(this), this._handleWindowEscapeBound = this._handleWindowEscape.bind(this), window.addEventListener("scroll", this._handleWindowScrollBound), window.addEventListener("resize", this._handleWindowResizeBound), window.addEventListener("keyup", this._handleWindowEscapeBound)
                    }
                }, {
                    key: "close",
                    value: function () {
                        var e = this;
                        this._updateVars(), this.doneAnimating = !1, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), s.remove(this.el), s.remove(this.$overlay[0]), "" !== this.caption && s.remove(this.$photoCaption[0]), window.removeEventListener("scroll", this._handleWindowScrollBound), window.removeEventListener("resize", this._handleWindowResizeBound), window.removeEventListener("keyup", this._handleWindowEscapeBound), s({
                            targets: this.$overlay[0],
                            opacity: 0,
                            duration: this.options.outDuration,
                            easing: "easeOutQuad",
                            complete: function () {
                                e.overlayActive = !1, e.$overlay.remove()
                            }
                        }), this._animateImageOut(), "" !== this.caption && s({
                            targets: this.$photoCaption[0],
                            opacity: 0,
                            duration: this.options.outDuration,
                            easing: "easeOutQuad",
                            complete: function () {
                                e.$photoCaption.remove()
                            }
                        })
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Materialbox
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        M.Materialbox = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "materialbox", "M_Materialbox")
    }(cash, M.anime),
    function (o) {
        "use strict";
        var e = {
            responsiveThreshold: 0
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Parallax = n).options = o.extend({}, i.defaults, t), n._enabled = window.innerWidth > n.options.responsiveThreshold, n.$img = n.$el.find("img").first(), n.$img.each(function () {
                        var e = this;
                        e.complete && o(e).trigger("load")
                    }), n._updateParallax(), n._setupEventHandlers(), n._setupStyles(), i._parallaxes.push(n), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        i._parallaxes.splice(i._parallaxes.indexOf(this), 1), this.$img[0].style.transform = "", this._removeEventHandlers(), this.$el[0].M_Parallax = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleImageLoadBound = this._handleImageLoad.bind(this), this.$img[0].addEventListener("load", this._handleImageLoadBound), 0 === i._parallaxes.length && (i._handleScrollThrottled = M.throttle(i._handleScroll, 5), window.addEventListener("scroll", i._handleScrollThrottled), i._handleWindowResizeThrottled = M.throttle(i._handleWindowResize, 5), window.addEventListener("resize", i._handleWindowResizeThrottled))
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.$img[0].removeEventListener("load", this._handleImageLoadBound), 0 === i._parallaxes.length && (window.removeEventListener("scroll", i._handleScrollThrottled), window.removeEventListener("resize", i._handleWindowResizeThrottled))
                    }
                }, {
                    key: "_setupStyles",
                    value: function () {
                        this.$img[0].style.opacity = 1
                    }
                }, {
                    key: "_handleImageLoad",
                    value: function () {
                        this._updateParallax()
                    }
                }, {
                    key: "_updateParallax",
                    value: function () {
                        var e = 0 < this.$el.height() ? this.el.parentNode.offsetHeight : 500,
                            t = this.$img[0].offsetHeight - e,
                            n = this.$el.offset().top + e,
                            i = this.$el.offset().top,
                            o = M.getDocumentScrollTop(),
                            a = window.innerHeight,
                            s = t * ((o + a - i) / (e + a));
                        this._enabled ? o < n && i < o + a && (this.$img[0].style.transform = "translate3D(-50%, " + s + "px, 0)") : this.$img[0].style.transform = ""
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Parallax
                    }
                }, {
                    key: "_handleScroll",
                    value: function () {
                        for (var e = 0; e < i._parallaxes.length; e++) {
                            var t = i._parallaxes[e];
                            t._updateParallax.call(t)
                        }
                    }
                }, {
                    key: "_handleWindowResize",
                    value: function () {
                        for (var e = 0; e < i._parallaxes.length; e++) {
                            var t = i._parallaxes[e];
                            t._enabled = window.innerWidth > t.options.responsiveThreshold
                        }
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        t._parallaxes = [], M.Parallax = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "parallax", "M_Parallax")
    }(cash),
    function (s, o) {
        "use strict";
        var e = {
            duration: 300,
            onShow: null,
            swipeable: !1,
            responsiveThreshold: Infinity
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Tabs = n).options = s.extend({}, i.defaults, t), n.$tabLinks = n.$el.children("li.tab").children("a"), n.index = 0, n._setupActiveTabLink(), n.options.swipeable ? n._setupSwipeableTabs() : n._setupNormalTabs(), n._setTabsAndTabWidth(), n._createIndicator(), n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this._indicator.parentNode.removeChild(this._indicator), this.options.swipeable ? this._teardownSwipeableTabs() : this._teardownNormalTabs(), this.$el[0].M_Tabs = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleWindowResizeBound = this._handleWindowResize.bind(this), window.addEventListener("resize", this._handleWindowResizeBound), this._handleTabClickBound = this._handleTabClick.bind(this), this.el.addEventListener("click", this._handleTabClickBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        window.removeEventListener("resize", this._handleWindowResizeBound), this.el.removeEventListener("click", this._handleTabClickBound)
                    }
                }, {
                    key: "_handleWindowResize",
                    value: function () {
                        this._setTabsAndTabWidth(), 0 !== this.tabWidth && 0 !== this.tabsWidth && (this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + "px", this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + "px")
                    }
                }, {
                    key: "_handleTabClick",
                    value: function (e) {
                        var t = this,
                            n = s(e.target).closest("li.tab"),
                            i = s(e.target).closest("a");
                        if (i.length && i.parent().hasClass("tab"))
                            if (n.hasClass("disabled")) e.preventDefault();
                            else if (!i.attr("target")) {
                                this.$activeTabLink.removeClass("active");
                                var o = this.$content;
                                this.$activeTabLink = i, this.$content = s(M.escapeHash(i[0].hash)), this.$tabLinks = this.$el.children("li.tab").children("a"), this.$activeTabLink.addClass("active");
                                var a = this.index;
                                this.index = Math.max(this.$tabLinks.index(i), 0), this.options.swipeable ? this._tabsCarousel && this._tabsCarousel.set(this.index, function () {
                                    "function" == typeof t.options.onShow && t.options.onShow.call(t, t.$content[0])
                                }) : this.$content.length && (this.$content[0].style.display = "block", this.$content.addClass("active"), "function" == typeof this.options.onShow && this.options.onShow.call(this, this.$content[0]), o.length && !o.is(this.$content) && (o[0].style.display = "none", o.removeClass("active"))), this._setTabsAndTabWidth(), this._animateIndicator(a), e.preventDefault()
                            }
                    }
                }, {
                    key: "_createIndicator",
                    value: function () {
                        var e = this,
                            t = document.createElement("li");
                        t.classList.add("indicator"), this.el.appendChild(t), this._indicator = t, setTimeout(function () {
                            e._indicator.style.left = e._calcLeftPos(e.$activeTabLink) + "px", e._indicator.style.right = e._calcRightPos(e.$activeTabLink) + "px"
                        }, 0)
                    }
                }, {
                    key: "_setupActiveTabLink",
                    value: function () {
                        this.$activeTabLink = s(this.$tabLinks.filter('[href="' + location.hash + '"]')), 0 === this.$activeTabLink.length && (this.$activeTabLink = this.$el.children("li.tab").children("a.active").first()), 0 === this.$activeTabLink.length && (this.$activeTabLink = this.$el.children("li.tab").children("a").first()), this.$tabLinks.removeClass("active"), this.$activeTabLink[0].classList.add("active"), this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0), this.$activeTabLink.length && (this.$content = s(M.escapeHash(this.$activeTabLink[0].hash)), this.$content.addClass("active"))
                    }
                }, {
                    key: "_setupSwipeableTabs",
                    value: function () {
                        var n = this;
                        window.innerWidth > this.options.responsiveThreshold && (this.options.swipeable = !1);
                        var i = s();
                        this.$tabLinks.each(function (e) {
                            var t = s(M.escapeHash(e.hash));
                            t.addClass("carousel-item"), i = i.add(t)
                        });
                        var e = s('<div class="tabs-content carousel carousel-slider"></div>');
                        i.first().before(e), e.append(i), i[0].style.display = "";
                        var t = this.$activeTabLink.closest(".tab").index();
                        this._tabsCarousel = M.Carousel.init(e[0], {
                            fullWidth: !0,
                            noWrap: !0,
                            onCycleTo: function (e) {
                                var t = n.index;
                                n.index = s(e).index(), n.$activeTabLink.removeClass("active"), n.$activeTabLink = n.$tabLinks.eq(n.index), n.$activeTabLink.addClass("active"), n._animateIndicator(t), "function" == typeof n.options.onShow && n.options.onShow.call(n, n.$content[0])
                            }
                        }), this._tabsCarousel.set(t)
                    }
                }, {
                    key: "_teardownSwipeableTabs",
                    value: function () {
                        var e = this._tabsCarousel.$el;
                        this._tabsCarousel.destroy(), e.after(e.children()), e.remove()
                    }
                }, {
                    key: "_setupNormalTabs",
                    value: function () {
                        this.$tabLinks.not(this.$activeTabLink).each(function (e) {
                            if (e.hash) {
                                var t = s(M.escapeHash(e.hash));
                                t.length && (t[0].style.display = "none")
                            }
                        })
                    }
                }, {
                    key: "_teardownNormalTabs",
                    value: function () {
                        this.$tabLinks.each(function (e) {
                            if (e.hash) {
                                var t = s(M.escapeHash(e.hash));
                                t.length && (t[0].style.display = "")
                            }
                        })
                    }
                }, {
                    key: "_setTabsAndTabWidth",
                    value: function () {
                        this.tabsWidth = this.$el.width(), this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length
                    }
                }, {
                    key: "_calcRightPos",
                    value: function (e) {
                        return Math.ceil(this.tabsWidth - e.position().left - e[0].getBoundingClientRect().width)
                    }
                }, {
                    key: "_calcLeftPos",
                    value: function (e) {
                        return Math.floor(e.position().left)
                    }
                }, {
                    key: "updateTabIndicator",
                    value: function () {
                        this._setTabsAndTabWidth(), this._animateIndicator(this.index)
                    }
                }, {
                    key: "_animateIndicator",
                    value: function (e) {
                        var t = 0,
                            n = 0;
                        0 <= this.index - e ? t = 90 : n = 90;
                        var i = {
                            targets: this._indicator,
                            left: {
                                value: this._calcLeftPos(this.$activeTabLink),
                                delay: t
                            },
                            right: {
                                value: this._calcRightPos(this.$activeTabLink),
                                delay: n
                            },
                            duration: this.options.duration,
                            easing: "easeOutQuad"
                        };
                        o.remove(this._indicator), o(i)
                    }
                }, {
                    key: "select",
                    value: function (e) {
                        var t = this.$tabLinks.filter('[href="#' + e + '"]');
                        t.length && t.trigger("click")
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Tabs
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        M.Tabs = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "tabs", "M_Tabs")
    }(cash, M.anime),
    function (d, e) {
        "use strict";
        var t = {
            exitDelay: 200,
            enterDelay: 0,
            html: null,
            margin: 5,
            inDuration: 250,
            outDuration: 200,
            position: "bottom",
            transitionMovement: 10
        },
            n = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Tooltip = n).options = d.extend({}, i.defaults, t), n.isOpen = !1, n.isHovered = !1, n.isFocused = !1, n._appendTooltipEl(), n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        d(this.tooltipEl).remove(), this._removeEventHandlers(), this.el.M_Tooltip = undefined
                    }
                }, {
                    key: "_appendTooltipEl",
                    value: function () {
                        var e = document.createElement("div");
                        e.classList.add("material-tooltip"), this.tooltipEl = e;
                        var t = document.createElement("div");
                        t.classList.add("tooltip-content"), t.innerHTML = this.options.html, e.appendChild(t), document.body.appendChild(e)
                    }
                }, {
                    key: "_updateTooltipContent",
                    value: function () {
                        this.tooltipEl.querySelector(".tooltip-content").innerHTML = this.options.html
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleMouseEnterBound = this._handleMouseEnter.bind(this), this._handleMouseLeaveBound = this._handleMouseLeave.bind(this), this._handleFocusBound = this._handleFocus.bind(this), this._handleBlurBound = this._handleBlur.bind(this), this.el.addEventListener("mouseenter", this._handleMouseEnterBound), this.el.addEventListener("mouseleave", this._handleMouseLeaveBound), this.el.addEventListener("focus", this._handleFocusBound, !0), this.el.addEventListener("blur", this._handleBlurBound, !0)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("mouseenter", this._handleMouseEnterBound), this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound), this.el.removeEventListener("focus", this._handleFocusBound, !0), this.el.removeEventListener("blur", this._handleBlurBound, !0)
                    }
                }, {
                    key: "open",
                    value: function (e) {
                        this.isOpen || (e = e === undefined || undefined, this.isOpen = !0, this.options = d.extend({}, this.options, this._getAttributeOptions()), this._updateTooltipContent(), this._setEnterDelayTimeout(e))
                    }
                }, {
                    key: "close",
                    value: function () {
                        this.isOpen && (this.isHovered = !1, this.isFocused = !1, this.isOpen = !1, this._setExitDelayTimeout())
                    }
                }, {
                    key: "_setExitDelayTimeout",
                    value: function () {
                        var e = this;
                        clearTimeout(this._exitDelayTimeout), this._exitDelayTimeout = setTimeout(function () {
                            e.isHovered || e.isFocused || e._animateOut()
                        }, this.options.exitDelay)
                    }
                }, {
                    key: "_setEnterDelayTimeout",
                    value: function (e) {
                        var t = this;
                        clearTimeout(this._enterDelayTimeout), this._enterDelayTimeout = setTimeout(function () {
                            (t.isHovered || t.isFocused || e) && t._animateIn()
                        }, this.options.enterDelay)
                    }
                }, {
                    key: "_positionTooltip",
                    value: function () {
                        var e = this.el,
                            t = this.tooltipEl,
                            n = e.offsetHeight,
                            i = e.offsetWidth,
                            o = t.offsetHeight,
                            a = t.offsetWidth,
                            s = void 0,
                            r = this.options.margin,
                            l = void 0,
                            u = void 0;
                        this.xMovement = 0, this.yMovement = 0, l = e.getBoundingClientRect().top + M.getDocumentScrollTop(), u = e.getBoundingClientRect().left + M.getDocumentScrollLeft(), "top" === this.options.position ? (l += -o - r, u += i / 2 - a / 2, this.yMovement = -this.options.transitionMovement) : "right" === this.options.position ? (l += n / 2 - o / 2, u += i + r, this.xMovement = this.options.transitionMovement) : "left" === this.options.position ? (l += n / 2 - o / 2, u += -a - r, this.xMovement = -this.options.transitionMovement) : (l += n + r, u += i / 2 - a / 2, this.yMovement = this.options.transitionMovement), s = this._repositionWithinScreen(u, l, a, o), d(t).css({
                            top: s.y + "px",
                            left: s.x + "px"
                        })
                    }
                }, {
                    key: "_repositionWithinScreen",
                    value: function (e, t, n, i) {
                        var o = M.getDocumentScrollLeft(),
                            a = M.getDocumentScrollTop(),
                            s = e - o,
                            r = t - a,
                            l = {
                                left: s,
                                top: r,
                                width: n,
                                height: i
                            },
                            u = this.options.margin + this.options.transitionMovement,
                            d = M.checkWithinContainer(document.body, l, u);
                        return d.left ? s = u : d.right && (s -= s + n - window.innerWidth), d.top ? r = u : d.bottom && (r -= r + i - window.innerHeight), {
                            x: s + o,
                            y: r + a
                        }
                    }
                }, {
                    key: "_animateIn",
                    value: function () {
                        this._positionTooltip(), this.tooltipEl.style.visibility = "visible", e.remove(this.tooltipEl), e({
                            targets: this.tooltipEl,
                            opacity: 1,
                            translateX: this.xMovement,
                            translateY: this.yMovement,
                            duration: this.options.inDuration,
                            easing: "easeOutCubic"
                        })
                    }
                }, {
                    key: "_animateOut",
                    value: function () {
                        e.remove(this.tooltipEl), e({
                            targets: this.tooltipEl,
                            opacity: 0,
                            translateX: 0,
                            translateY: 0,
                            duration: this.options.outDuration,
                            easing: "easeOutCubic"
                        })
                    }
                }, {
                    key: "_handleMouseEnter",
                    value: function () {
                        this.isHovered = !0, this.isFocused = !1, this.open(!1)
                    }
                }, {
                    key: "_handleMouseLeave",
                    value: function () {
                        this.isHovered = !1, this.isFocused = !1, this.close()
                    }
                }, {
                    key: "_handleFocus",
                    value: function () {
                        M.tabPressed && (this.isFocused = !0, this.open(!1))
                    }
                }, {
                    key: "_handleBlur",
                    value: function () {
                        this.isFocused = !1, this.close()
                    }
                }, {
                    key: "_getAttributeOptions",
                    value: function () {
                        var e = {},
                            t = this.el.getAttribute("data-tooltip"),
                            n = this.el.getAttribute("data-position");
                        return t && (e.html = t), n && (e.position = n), e
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Tooltip
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return t
                    }
                }]), i
            }();
        M.Tooltip = n, M.jQueryLoaded && M.initializeJqueryWrapper(n, "tooltip", "M_Tooltip")
    }(cash, M.anime),
    function (n) {
        "use strict";

        function t(e) {
            return null !== e && e === e.window
        }

        function a(e) {
            return t(e) ? e : 9 === e.nodeType && e.defaultView
        }

        function u(e) {
            var t, n, i = {
                top: 0,
                left: 0
            },
                o = e && e.ownerDocument;
            return t = o.documentElement, typeof e.getBoundingClientRect != typeof undefined && (i = e.getBoundingClientRect()), n = a(o), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }
        }

        function d(e) {
            var t = "";
            for (var n in e) e.hasOwnProperty(n) && (t += n + ":" + e[n] + ";");
            return t
        }

        function i(e) {
            if (!1 === l.allowEvent(e)) return null;
            for (var t = null, n = e.target || e.srcElement; null !== n.parentNode;) {
                if (!(n instanceof SVGElement) && -1 !== n.className.indexOf("waves-effect")) {
                    t = n;
                    break
                }
                n = n.parentNode
            }
            return t
        }

        function o(e) {
            var t = i(e);
            null !== t && (c.show(e, t), "ontouchstart" in n && (t.addEventListener("touchend", c.hide, !1), t.addEventListener("touchcancel", c.hide, !1)), t.addEventListener("mouseup", c.hide, !1), t.addEventListener("mouseleave", c.hide, !1), t.addEventListener("dragend", c.hide, !1))
        }
        var e = e || {},
            s = document.querySelectorAll.bind(document),
            c = {
                duration: 750,
                show: function (e, t) {
                    if (2 === e.button) return !1;
                    var n = t || this,
                        i = document.createElement("div");
                    i.className = "waves-ripple", n.appendChild(i);
                    var o = u(n),
                        a = e.pageY - o.top,
                        s = e.pageX - o.left,
                        r = "scale(" + n.clientWidth / 100 * 10 + ")";
                    "touches" in e && (a = e.touches[0].pageY - o.top, s = e.touches[0].pageX - o.left), i.setAttribute("data-hold", Date.now()), i.setAttribute("data-scale", r), i.setAttribute("data-x", s), i.setAttribute("data-y", a);
                    var l = {
                        top: a + "px",
                        left: s + "px"
                    };
                    i.className = i.className + " waves-notransition", i.setAttribute("style", d(l)), i.className = i.className.replace("waves-notransition", ""), l["-webkit-transform"] = r, l["-moz-transform"] = r, l["-ms-transform"] = r, l["-o-transform"] = r, l.transform = r, l.opacity = "1", l["-webkit-transition-duration"] = c.duration + "ms", l["-moz-transition-duration"] = c.duration + "ms", l["-o-transition-duration"] = c.duration + "ms", l["transition-duration"] = c.duration + "ms", l["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", i.setAttribute("style", d(l))
                },
                hide: function (t) {
                    l.touchup(t);
                    var n = this,
                        i = (n.clientWidth, null),
                        e = n.getElementsByClassName("waves-ripple");
                    if (!(0 < e.length)) return !1;
                    var o = (i = e[e.length - 1]).getAttribute("data-x"),
                        a = i.getAttribute("data-y"),
                        s = i.getAttribute("data-scale"),
                        r = 350 - (Date.now() - Number(i.getAttribute("data-hold")));
                    r < 0 && (r = 0), setTimeout(function () {
                        var e = {
                            top: a + "px",
                            left: o + "px",
                            opacity: "0",
                            "-webkit-transition-duration": c.duration + "ms",
                            "-moz-transition-duration": c.duration + "ms",
                            "-o-transition-duration": c.duration + "ms",
                            "transition-duration": c.duration + "ms",
                            "-webkit-transform": s,
                            "-moz-transform": s,
                            "-ms-transform": s,
                            "-o-transform": s,
                            transform: s
                        };
                        i.setAttribute("style", d(e)), setTimeout(function () {
                            try {
                                n.removeChild(i)
                            } catch (t) {
                                return !1
                            }
                        }, c.duration)
                    }, r)
                },
                wrapInput: function (e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if ("input" === n.tagName.toLowerCase()) {
                            var i = n.parentNode;
                            if ("i" === i.tagName.toLowerCase() && -1 !== i.className.indexOf("waves-effect")) continue;
                            var o = document.createElement("i");
                            o.className = n.className + " waves-input-wrapper";
                            var a = n.getAttribute("style");
                            a || (a = ""), o.setAttribute("style", a), n.className = "waves-button-input", n.removeAttribute("style"), i.replaceChild(o, n), o.appendChild(n)
                        }
                    }
                }
            },
            l = {
                touches: 0,
                allowEvent: function (e) {
                    var t = !0;
                    return "touchstart" === e.type ? l.touches += 1 : "touchend" === e.type || "touchcancel" === e.type ? setTimeout(function () {
                        0 < l.touches && (l.touches -= 1)
                    }, 500) : "mousedown" === e.type && 0 < l.touches && (t = !1), t
                },
                touchup: function (e) {
                    l.allowEvent(e)
                }
            };
        e.displayEffect = function (e) {
            "duration" in (e = e || {}) && (c.duration = e.duration), c.wrapInput(s(".waves-effect")), "ontouchstart" in n && document.body.addEventListener("touchstart", o, !1), document.body.addEventListener("mousedown", o, !1)
        }, e.attach = function (e) {
            "input" === e.tagName.toLowerCase() && (c.wrapInput([e]), e = e.parentNode), "ontouchstart" in n && e.addEventListener("touchstart", o, !1), e.addEventListener("mousedown", o, !1)
        }, n.Waves = e, document.addEventListener("DOMContentLoaded", function () {
            e.displayEffect()
        }, !1)
    }(window),
    function (n, i) {
        "use strict";
        var e = {
            html: "",
            displayLength: 4e3,
            inDuration: 300,
            outDuration: 375,
            classes: "",
            completeCallback: null,
            activationPercent: .8
        },
            t = function () {
                function o(e) {
                    _classCallCheck(this, o), this.options = n.extend({}, o.defaults, e), this.message = this.options.html, this.panning = !1, this.timeRemaining = this.options.displayLength, 0 === o._toasts.length && o._createContainer(), o._toasts.push(this);
                    var t = this._createToast();
                    (t.M_Toast = this).el = t, this.$el = n(t), this._animateIn(), this._setTimer()
                }
                return _createClass(o, [{
                    key: "_createToast",
                    value: function () {
                        var e = document.createElement("div");
                        return e.classList.add("toast"), this.options.classes.length && n(e).addClass(this.options.classes), ("object" == typeof HTMLElement ? this.message instanceof HTMLElement : this.message && "object" == typeof this.message && null !== this.message && 1 === this.message.nodeType && "string" == typeof this.message.nodeName) ? e.appendChild(this.message) : this.message.jquery ? n(e).append(this.message[0]) : e.innerHTML = this.message, o._container.appendChild(e), e
                    }
                }, {
                    key: "_animateIn",
                    value: function () {
                        i({
                            targets: this.el,
                            top: 0,
                            opacity: 1,
                            duration: this.options.inDuration,
                            easing: "easeOutCubic"
                        })
                    }
                }, {
                    key: "_setTimer",
                    value: function () {
                        var e = this;
                        this.timeRemaining !== Infinity && (this.counterInterval = setInterval(function () {
                            e.panning || (e.timeRemaining -= 20), e.timeRemaining <= 0 && e.dismiss()
                        }, 20))
                    }
                }, {
                    key: "dismiss",
                    value: function () {
                        var e = this;
                        window.clearInterval(this.counterInterval);
                        var t = this.el.offsetWidth * this.options.activationPercent;
                        this.wasSwiped && (this.el.style.transition = "transform .05s, opacity .05s", this.el.style.transform = "translateX(" + t + "px)", this.el.style.opacity = 0), i({
                            targets: this.el,
                            opacity: 0,
                            marginTop: -40,
                            duration: this.options.outDuration,
                            easing: "easeOutExpo",
                            complete: function () {
                                "function" == typeof e.options.completeCallback && e.options.completeCallback(), e.$el.remove(), o._toasts.splice(o._toasts.indexOf(e), 1), 0 === o._toasts.length && o._removeContainer()
                            }
                        })
                    }
                }], [{
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Toast
                    }
                }, {
                    key: "_createContainer",
                    value: function () {
                        var e = document.createElement("div");
                        e.setAttribute("id", "toast-container"), e.addEventListener("touchstart", o._onDragStart), e.addEventListener("touchmove", o._onDragMove), e.addEventListener("touchend", o._onDragEnd), e.addEventListener("mousedown", o._onDragStart), document.addEventListener("mousemove", o._onDragMove), document.addEventListener("mouseup", o._onDragEnd), document.body.appendChild(e), o._container = e
                    }
                }, {
                    key: "_removeContainer",
                    value: function () {
                        document.removeEventListener("mousemove", o._onDragMove), document.removeEventListener("mouseup", o._onDragEnd), n(o._container).remove(), o._container = null
                    }
                }, {
                    key: "_onDragStart",
                    value: function (e) {
                        if (e.target && n(e.target).closest(".toast").length) {
                            var t = n(e.target).closest(".toast")[0].M_Toast;
                            t.panning = !0, (o._draggedToast = t).el.classList.add("panning"), t.el.style.transition = "", t.startingXPos = o._xPos(e), t.time = Date.now(), t.xPos = o._xPos(e)
                        }
                    }
                }, {
                    key: "_onDragMove",
                    value: function (e) {
                        if (o._draggedToast) {
                            e.preventDefault();
                            var t = o._draggedToast;
                            t.deltaX = Math.abs(t.xPos - o._xPos(e)), t.xPos = o._xPos(e), t.velocityX = t.deltaX / (Date.now() - t.time), t.time = Date.now();
                            var n = t.xPos - t.startingXPos,
                                i = t.el.offsetWidth * t.options.activationPercent;
                            t.el.style.transform = "translateX(" + n + "px)", t.el.style.opacity = 1 - Math.abs(n / i)
                        }
                    }
                }, {
                    key: "_onDragEnd",
                    value: function () {
                        if (o._draggedToast) {
                            var e = o._draggedToast;
                            e.panning = !1, e.el.classList.remove("panning");
                            var t = e.xPos - e.startingXPos,
                                n = e.el.offsetWidth * e.options.activationPercent;
                            Math.abs(t) > n || 1 < e.velocityX ? (e.wasSwiped = !0, e.dismiss()) : (e.el.style.transition = "transform .2s, opacity .2s", e.el.style.transform = "", e.el.style.opacity = ""), o._draggedToast = null
                        }
                    }
                }, {
                    key: "_xPos",
                    value: function (e) {
                        return e.targetTouches && 1 <= e.targetTouches.length ? e.targetTouches[0].clientX : e.clientX
                    }
                }, {
                    key: "dismissAll",
                    value: function () {
                        for (var e in o._toasts) o._toasts[e].dismiss()
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), o
            }();
        t._toasts = [], t._container = null, t._draggedToast = null, M.Toast = t, M.toast = function (e) {
            return new t(e)
        }
    }(cash, M.anime),
    function (o, a) {
        "use strict";
        var e = {
            edge: "left",
            draggable: !0,
            inDuration: 250,
            outDuration: 200,
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            preventScrolling: !0
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Sidenav = n).id = n.$el.attr("id"), n.options = o.extend({}, i.defaults, t), n.isOpen = !1, n.isFixed = n.el.classList.contains("sidenav-fixed"), n.isDragged = !1, n.lastWindowWidth = window.innerWidth, n.lastWindowHeight = window.innerHeight, n._createOverlay(), n._createDragTarget(), n._setupEventHandlers(), n._setupClasses(), n._setupFixed(), i._sidenavs.push(n), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this._enableBodyScrolling(), this._overlay.parentNode.removeChild(this._overlay), this.dragTarget.parentNode.removeChild(this.dragTarget), this.el.M_Sidenav = undefined, this.el.style.transform = "";
                        var e = i._sidenavs.indexOf(this);
                        0 <= e && i._sidenavs.splice(e, 1)
                    }
                }, {
                    key: "_createOverlay",
                    value: function () {
                        var e = document.createElement("div");
                        this._closeBound = this.close.bind(this), e.classList.add("sidenav-overlay"), e.addEventListener("click", this._closeBound), document.body.appendChild(e), this._overlay = e
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        0 === i._sidenavs.length && document.body.addEventListener("click", this._handleTriggerClick), this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this), this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this), this._handleCloseDragBound = this._handleCloseDrag.bind(this), this._handleCloseReleaseBound = this._handleCloseRelease.bind(this), this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this), this.dragTarget.addEventListener("touchmove", this._handleDragTargetDragBound), this.dragTarget.addEventListener(
                            "touchend", this._handleDragTargetReleaseBound), this._overlay.addEventListener("touchmove", this._handleCloseDragBound), this._overlay.addEventListener("touchend", this._handleCloseReleaseBound), this.el.addEventListener("touchmove", this._handleCloseDragBound), this.el.addEventListener("touchend", this._handleCloseReleaseBound), this.el.addEventListener("click", this._handleCloseTriggerClickBound), this.isFixed && (this._handleWindowResizeBound = this._handleWindowResize.bind(this), window.addEventListener("resize", this._handleWindowResizeBound))
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        1 === i._sidenavs.length && document.body.removeEventListener("click", this._handleTriggerClick), this.dragTarget.removeEventListener("touchmove", this._handleDragTargetDragBound), this.dragTarget.removeEventListener("touchend", this._handleDragTargetReleaseBound), this._overlay.removeEventListener("touchmove", this._handleCloseDragBound), this._overlay.removeEventListener("touchend", this._handleCloseReleaseBound), this.el.removeEventListener("touchmove", this._handleCloseDragBound), this.el.removeEventListener("touchend", this._handleCloseReleaseBound), this.el.removeEventListener("click", this._handleCloseTriggerClickBound), this.isFixed && window.removeEventListener("resize", this._handleWindowResizeBound)
                    }
                }, {
                    key: "_handleTriggerClick",
                    value: function (e) {
                        var t = o(e.target).closest(".sidenav-trigger");
                        if (e.target && t.length) {
                            var n = M.getIdFromTrigger(t[0]),
                                i = document.getElementById(n).M_Sidenav;
                            i && i.open(t), e.preventDefault()
                        }
                    }
                }, {
                    key: "_startDrag",
                    value: function (e) {
                        var t = e.targetTouches[0].clientX;
                        this.isDragged = !0, this._startingXpos = t, this._xPos = this._startingXpos, this._time = Date.now(), this._width = this.el.getBoundingClientRect().width, this._overlay.style.display = "block", this._initialScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop(), this._verticallyScrolling = !1, a.remove(this.el), a.remove(this._overlay)
                    }
                }, {
                    key: "_dragMoveUpdate",
                    value: function (e) {
                        var t = e.targetTouches[0].clientX,
                            n = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
                        this.deltaX = Math.abs(this._xPos - t), this._xPos = t, this.velocityX = this.deltaX / (Date.now() - this._time), this._time = Date.now(), this._initialScrollTop !== n && (this._verticallyScrolling = !0)
                    }
                }, {
                    key: "_handleDragTargetDrag",
                    value: function (e) {
                        if (this.options.draggable && !this._isCurrentlyFixed() && !this._verticallyScrolling) {
                            this.isDragged || this._startDrag(e), this._dragMoveUpdate(e);
                            var t = this._xPos - this._startingXpos,
                                n = 0 < t ? "right" : "left";
                            t = Math.min(this._width, Math.abs(t)), this.options.edge === n && (t = 0);
                            var i = t,
                                o = "translateX(-100%)";
                            "right" === this.options.edge && (o = "translateX(100%)", i = -i), this.percentOpen = Math.min(1, t / this._width), this.el.style.transform = o + " translateX(" + i + "px)", this._overlay.style.opacity = this.percentOpen
                        }
                    }
                }, {
                    key: "_handleDragTargetRelease",
                    value: function () {
                        this.isDragged && (.2 < this.percentOpen ? this.open() : this._animateOut(), this.isDragged = !1, this._verticallyScrolling = !1)
                    }
                }, {
                    key: "_handleCloseDrag",
                    value: function (e) {
                        if (this.isOpen) {
                            if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) return;
                            this.isDragged || this._startDrag(e), this._dragMoveUpdate(e);
                            var t = this._xPos - this._startingXpos,
                                n = 0 < t ? "right" : "left";
                            t = Math.min(this._width, Math.abs(t)), this.options.edge !== n && (t = 0);
                            var i = -t;
                            "right" === this.options.edge && (i = -i), this.percentOpen = Math.min(1, 1 - t / this._width), this.el.style.transform = "translateX(" + i + "px)", this._overlay.style.opacity = this.percentOpen
                        }
                    }
                }, {
                    key: "_handleCloseRelease",
                    value: function () {
                        this.isOpen && this.isDragged && (.8 < this.percentOpen ? this._animateIn() : this.close(), this.isDragged = !1, this._verticallyScrolling = !1)
                    }
                }, {
                    key: "_handleCloseTriggerClick",
                    value: function (e) {
                        o(e.target).closest(".sidenav-close").length && !this._isCurrentlyFixed() && this.close()
                    }
                }, {
                    key: "_handleWindowResize",
                    value: function () {
                        this.lastWindowWidth !== window.innerWidth && (992 < window.innerWidth ? this.open() : this.close()), this.lastWindowWidth = window.innerWidth, this.lastWindowHeight = window.innerHeight
                    }
                }, {
                    key: "_setupClasses",
                    value: function () {
                        "right" === this.options.edge && (this.el.classList.add("right-aligned"), this.dragTarget.classList.add("right-aligned"))
                    }
                }, {
                    key: "_removeClasses",
                    value: function () {
                        this.el.classList.remove("right-aligned"), this.dragTarget.classList.remove("right-aligned")
                    }
                }, {
                    key: "_setupFixed",
                    value: function () {
                        this._isCurrentlyFixed() && this.open()
                    }
                }, {
                    key: "_isCurrentlyFixed",
                    value: function () {
                        return this.isFixed && 992 < window.innerWidth
                    }
                }, {
                    key: "_createDragTarget",
                    value: function () {
                        var e = document.createElement("div");
                        e.classList.add("drag-target"), document.body.appendChild(e), this.dragTarget = e
                    }
                }, {
                    key: "_preventBodyScrolling",
                    value: function () {
                        document.body.style.overflow = "hidden"
                    }
                }, {
                    key: "_enableBodyScrolling",
                    value: function () {
                        document.body.style.overflow = ""
                    }
                }, {
                    key: "open",
                    value: function () {
                        !0 !== this.isOpen && (this.isOpen = !0, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el), this._isCurrentlyFixed() ? (a.remove(this.el), a({
                            targets: this.el,
                            translateX: 0,
                            duration: 0,
                            easing: "easeOutQuad"
                        }), this._enableBodyScrolling(), this._overlay.style.display = "none") : (this.options.preventScrolling && this._preventBodyScrolling(), this.isDragged && 1 == this.percentOpen || this._animateIn()))
                    }
                }, {
                    key: "close",
                    value: function () {
                        if (!1 !== this.isOpen)
                            if (this.isOpen = !1, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), this._isCurrentlyFixed()) {
                                var e = "left" === this.options.edge ? "-105%" : "105%";
                                this.el.style.transform = "translateX(" + e + ")"
                            } else this._enableBodyScrolling(), this.isDragged && 0 == this.percentOpen ? this._overlay.style.display = "none" : this._animateOut()
                    }
                }, {
                    key: "_animateIn",
                    value: function () {
                        this._animateSidenavIn(), this._animateOverlayIn()
                    }
                }, {
                    key: "_animateSidenavIn",
                    value: function () {
                        var e = this,
                            t = "left" === this.options.edge ? -1 : 1;
                        this.isDragged && (t = "left" === this.options.edge ? t + this.percentOpen : t - this.percentOpen), a.remove(this.el), a({
                            targets: this.el,
                            translateX: [100 * t + "%", 0],
                            duration: this.options.inDuration,
                            easing: "easeOutQuad",
                            complete: function () {
                                "function" == typeof e.options.onOpenEnd && e.options.onOpenEnd.call(e, e.el)
                            }
                        })
                    }
                }, {
                    key: "_animateOverlayIn",
                    value: function () {
                        var e = 0;
                        this.isDragged ? e = this.percentOpen : o(this._overlay).css({
                            display: "block"
                        }), a.remove(this._overlay), a({
                            targets: this._overlay,
                            opacity: [e, 1],
                            duration: this.options.inDuration,
                            easing: "easeOutQuad"
                        })
                    }
                }, {
                    key: "_animateOut",
                    value: function () {
                        this._animateSidenavOut(), this._animateOverlayOut()
                    }
                }, {
                    key: "_animateSidenavOut",
                    value: function () {
                        var e = this,
                            t = "left" === this.options.edge ? -1 : 1,
                            n = 0;
                        this.isDragged && (n = "left" === this.options.edge ? t + this.percentOpen : t - this.percentOpen), a.remove(this.el), a({
                            targets: this.el,
                            translateX: [100 * n + "%", 105 * t + "%"],
                            duration: this.options.outDuration,
                            easing: "easeOutQuad",
                            complete: function () {
                                "function" == typeof e.options.onCloseEnd && e.options.onCloseEnd.call(e, e.el)
                            }
                        })
                    }
                }, {
                    key: "_animateOverlayOut",
                    value: function () {
                        var e = this;
                        a.remove(this._overlay), a({
                            targets: this._overlay,
                            opacity: 0,
                            duration: this.options.outDuration,
                            easing: "easeOutQuad",
                            complete: function () {
                                o(e._overlay).css("display", "none")
                            }
                        })
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Sidenav
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        t._sidenavs = [], M.Sidenav = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "sidenav", "M_Sidenav")
    }(cash, M.anime),
    function (a, s) {
        "use strict";
        var e = {
            throttle: 100,
            scrollOffset: 200,
            activeClass: "active",
            getActiveElement: function (e) {
                return 'a[href="#' + e + '"]'
            }
        },
            t = function () {
                function h(e, t) {
                    _classCallCheck(this, h);
                    var n = _possibleConstructorReturn(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, h, e, t));
                    return (n.el.M_ScrollSpy = n).options = a.extend({}, h.defaults, t), h._elements.push(n), h._count++ , h._increment++ , n.tickId = -1, n.id = h._increment, n._setupEventHandlers(), n._handleWindowScroll(), n
                }
                return _inherits(h, Component), _createClass(h, [{
                    key: "destroy",
                    value: function () {
                        h._elements.splice(h._elements.indexOf(this), 1), h._elementsInView.splice(h._elementsInView.indexOf(this), 1), h._visibleElements.splice(h._visibleElements.indexOf(this.$el), 1), h._count-- , this._removeEventHandlers(), a(this.options.getActiveElement(this.$el.attr("id"))).removeClass(this.options.activeClass), this.el.M_ScrollSpy = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        var e = M.throttle(this._handleWindowScroll, 200);
                        this._handleThrottledResizeBound = e.bind(this), this._handleWindowScrollBound = this._handleWindowScroll.bind(this), 1 === h._count && (window.addEventListener("scroll", this._handleWindowScrollBound), window.addEventListener("resize", this._handleThrottledResizeBound), document.body.addEventListener("click", this._handleTriggerClick))
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        0 === h._count && (window.removeEventListener("scroll", this._handleWindowScrollBound), window.removeEventListener("resize", this._handleThrottledResizeBound), document.body.removeEventListener("click", this._handleTriggerClick))
                    }
                }, {
                    key: "_handleTriggerClick",
                    value: function (e) {
                        for (var t = a(e.target), n = h._elements.length - 1; 0 <= n; n--) {
                            var i = h._elements[n];
                            if (t.is('a[href="#' + i.$el.attr("id") + '"]')) {
                                e.preventDefault();
                                var o = i.$el.offset().top + 1;
                                s({
                                    targets: [document.documentElement, document.body],
                                    scrollTop: o - i.options.scrollOffset,
                                    duration: 400,
                                    easing: "easeOutCubic"
                                });
                                break
                            }
                        }
                    }
                }, {
                    key: "_handleWindowScroll",
                    value: function () {
                        h._ticks++;
                        for (var e = M.getDocumentScrollTop(), t = M.getDocumentScrollLeft(), n = t + window.innerWidth, i = e + window.innerHeight, o = h._findElements(e, n, i, t), a = 0; a < o.length; a++) {
                            var s = o[a];
                            s.tickId < 0 && s._enter(), s.tickId = h._ticks
                        }
                        for (var r = 0; r < h._elementsInView.length; r++) {
                            var l = h._elementsInView[r],
                                u = l.tickId;
                            0 <= u && u !== h._ticks && (l._exit(), l.tickId = -1)
                        }
                        h._elementsInView = o
                    }
                }, {
                    key: "_enter",
                    value: function () {
                        h._visibleElements = h._visibleElements.filter(function (e) {
                            return 0 != e.height()
                        }), h._visibleElements[0] ? (a(this.options.getActiveElement(h._visibleElements[0].attr("id"))).removeClass(this.options.activeClass), h._visibleElements[0][0].M_ScrollSpy && this.id < h._visibleElements[0][0].M_ScrollSpy.id ? h._visibleElements.unshift(this.$el) : h._visibleElements.push(this.$el)) : h._visibleElements.push(this.$el), a(this.options.getActiveElement(h._visibleElements[0].attr("id"))).addClass(this.options.activeClass)
                    }
                }, {
                    key: "_exit",
                    value: function () {
                        var t = this;
                        h._visibleElements = h._visibleElements.filter(function (e) {
                            return 0 != e.height()
                        }), h._visibleElements[0] && (a(this.options.getActiveElement(h._visibleElements[0].attr("id"))).removeClass(this.options.activeClass), h._visibleElements = h._visibleElements.filter(function (e) {
                            return e.attr("id") != t.$el.attr("id")
                        }), h._visibleElements[0] && a(this.options.getActiveElement(h._visibleElements[0].attr("id"))).addClass(this.options.activeClass))
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(h.__proto__ || Object.getPrototypeOf(h), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_ScrollSpy
                    }
                }, {
                    key: "_findElements",
                    value: function (e, t, n, i) {
                        for (var o = [], a = 0; a < h._elements.length; a++) {
                            var s = h._elements[a],
                                r = e + s.options.scrollOffset || 200;
                            if (0 < s.$el.height()) {
                                var l = s.$el.offset().top,
                                    u = s.$el.offset().left,
                                    d = u + s.$el.width(),
                                    c = l + s.$el.height();
                                !(t < u || d < i || n < l || c < r) && o.push(s)
                            }
                        }
                        return o
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), h
            }();
        t._elements = [], t._elementsInView = [], t._visibleElements = [], t._count = 0, t._increment = 0, t._ticks = 0, M.ScrollSpy = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "scrollSpy", "M_ScrollSpy")
    }(cash, M.anime),
    function (d) {
        "use strict";
        var e = {
            data: {},
            limit: Infinity,
            onAutocomplete: null,
            minLength: 1,
            sortFunction: function (e, t, n) {
                return e.indexOf(n) - t.indexOf(n)
            }
        },
            t = function () {
                function o(e, t) {
                    _classCallCheck(this, o);
                    var n = _possibleConstructorReturn(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, o, e, t));
                    return (n.el.M_Autocomplete = n).options = d.extend({}, o.defaults, t), n.isOpen = !1, n.count = 0, n.activeIndex = -1, n.oldVal, n.$inputField = n.$el.closest(".input-field"), n.$active = d(), n._mousedown = !1, n._setupDropdown(), n._setupEventHandlers(), n
                }
                return _inherits(o, Component), _createClass(o, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this._removeDropdown(), this.el.M_Autocomplete = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleInputBlurBound = this._handleInputBlur.bind(this), this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this), this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this), this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(this), this.el.addEventListener("blur", this._handleInputBlurBound), this.el.addEventListener("keyup", this._handleInputKeyupAndFocusBound), this.el.addEventListener("focus", this._handleInputKeyupAndFocusBound), this.el.addEventListener("keydown", this._handleInputKeydownBound), this.el.addEventListener("click", this._handleInputClickBound), this.container.addEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound), this.container.addEventListener("mouseup", this._handleContainerMouseupAndTouchendBound), "undefined" != typeof window.ontouchstart && (this.container.addEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound), this.container.addEventListener("touchend", this._handleContainerMouseupAndTouchendBound))
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("blur", this._handleInputBlurBound), this.el.removeEventListener("keyup", this._handleInputKeyupAndFocusBound), this.el.removeEventListener("focus", this._handleInputKeyupAndFocusBound), this.el.removeEventListener("keydown", this._handleInputKeydownBound), this.el.removeEventListener("click", this._handleInputClickBound), this.container.removeEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound), this.container.removeEventListener("mouseup", this._handleContainerMouseupAndTouchendBound), "undefined" != typeof window.ontouchstart && (this.container.removeEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound), this.container.removeEventListener("touchend", this._handleContainerMouseupAndTouchendBound))
                    }
                }, {
                    key: "_setupDropdown",
                    value: function () {
                        var t = this;
                        this.container = document.createElement("ul"), this.container.id = "autocomplete-options-" + M.guid(), d(this.container).addClass("autocomplete-content dropdown-content"), this.$inputField.append(this.container), this.el.setAttribute("data-target", this.container.id), this.dropdown = M.Dropdown.init(this.el, {
                            autoFocus: !1,
                            closeOnClick: !1,
                            coverTrigger: !1,
                            onItemClick: function (e) {
                                t.selectOption(d(e))
                            }
                        }), this.el.removeEventListener("click", this.dropdown._handleClickBound)
                    }
                }, {
                    key: "_removeDropdown",
                    value: function () {
                        this.container.parentNode.removeChild(this.container)
                    }
                }, {
                    key: "_handleInputBlur",
                    value: function () {
                        this._mousedown || (this.close(), this._resetAutocomplete())
                    }
                }, {
                    key: "_handleInputKeyupAndFocus",
                    value: function (e) {
                        "keyup" === e.type && (o._keydown = !1), this.count = 0;
                        var t = this.el.value.toLowerCase();
                        13 !== e.keyCode && 38 !== e.keyCode && 40 !== e.keyCode && (this.oldVal === t || !M.tabPressed && "focus" === e.type || this.open(), this.oldVal = t)
                    }
                }, {
                    key: "_handleInputKeydown",
                    value: function (e) {
                        o._keydown = !0;
                        var t = e.keyCode,
                            n = void 0,
                            i = d(this.container).children("li").length;
                        t === M.keys.ENTER && 0 <= this.activeIndex ? (n = d(this.container).children("li").eq(this.activeIndex)).length && (this.selectOption(n), e.preventDefault()) : t !== M.keys.ARROW_UP && t !== M.keys.ARROW_DOWN || (e.preventDefault(), t === M.keys.ARROW_UP && 0 < this.activeIndex && this.activeIndex-- , t === M.keys.ARROW_DOWN && this.activeIndex < i - 1 && this.activeIndex++ , this.$active.removeClass("active"), 0 <= this.activeIndex && (this.$active = d(this.container).children("li").eq(this.activeIndex), this.$active.addClass("active")))
                    }
                }, {
                    key: "_handleInputClick",
                    value: function () {
                        this.open()
                    }
                }, {
                    key: "_handleContainerMousedownAndTouchstart",
                    value: function () {
                        this._mousedown = !0
                    }
                }, {
                    key: "_handleContainerMouseupAndTouchend",
                    value: function () {
                        this._mousedown = !1
                    }
                }, {
                    key: "_highlight",
                    value: function (e, t) {
                        var n = t.find("img"),
                            i = t.text().toLowerCase().indexOf("" + e.toLowerCase()),
                            o = i + e.length - 1,
                            a = t.text().slice(0, i),
                            s = t.text().slice(i, o + 1),
                            r = t.text().slice(o + 1);
                        t.html("<span>" + a + "<span class='highlight'>" + s + "</span>" + r + "</span>"), n.length && t.prepend(n)
                    }
                }, {
                    key: "_resetCurrentElement",
                    value: function () {
                        this.activeIndex = -1, this.$active.removeClass("active")
                    }
                }, {
                    key: "_resetAutocomplete",
                    value: function () {
                        d(this.container).empty(), this._resetCurrentElement(), this.oldVal = null, this.isOpen = !1, this._mousedown = !1
                    }
                }, {
                    key: "selectOption",
                    value: function (e) {
                        var t = e.text().trim();
                        this.el.value = t, this.$el.trigger("change"), this._resetAutocomplete(), this.close(), "function" == typeof this.options.onAutocomplete && this.options.onAutocomplete.call(this, t)
                    }
                }, {
                    key: "_renderDropdown",
                    value: function (e, n) {
                        var i = this;
                        this._resetAutocomplete();
                        var t = [];
                        for (var o in e)
                            if (e.hasOwnProperty(o) && -1 !== o.toLowerCase().indexOf(n)) {
                                if (this.count >= this.options.limit) break;
                                var a = {
                                    data: e[o],
                                    key: o
                                };
                                t.push(a), this.count++
                            }
                        if (this.options.sortFunction) {
                            var s = function (e, t) {
                                return i.options.sortFunction(e.key.toLowerCase(), t.key.toLowerCase(), n.toLowerCase())
                            };
                            t.sort(s)
                        }
                        for (var r = 0; r < t.length; r++) {
                            var l = t[r],
                                u = d("<li></li>");
                            l.data ? u.append('<img src="' + l.data + '" class="right circle"><span>' + l.key + "</span>") : u.append("<span>" + l.key + "</span>"), d(this.container).append(u), this._highlight(n, u)
                        }
                    }
                }, {
                    key: "open",
                    value: function () {
                        var e = this.el.value.toLowerCase();
                        this._resetAutocomplete(), e.length >= this.options.minLength && (this.isOpen = !0, this._renderDropdown(this.options.data, e)), this.dropdown.isOpen ? this.dropdown.recalculateDimensions() : this.dropdown.open()
                    }
                }, {
                    key: "close",
                    value: function () {
                        this.dropdown.close()
                    }
                }, {
                    key: "updateData",
                    value: function (e) {
                        var t = this.el.value.toLowerCase();
                        this.options.data = e, this.isOpen && this._renderDropdown(e, t)
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(o.__proto__ || Object.getPrototypeOf(o), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Autocomplete
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), o
            }();
        t._keydown = !1, M.Autocomplete = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "autocomplete", "M_Autocomplete")
    }(cash),
    function (d) {
        M.updateTextFields = function () {
            d("input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea").each(function (e) {
                var t = d(this);
                0 < e.value.length || d(e).is(":focus") || e.autofocus || null !== t.attr("placeholder") ? t.siblings("label").addClass("active") : e.validity ? t.siblings("label").toggleClass("active", !0 === e.validity.badInput) : t.siblings("label").removeClass("active")
            })
        }, M.validate_field = function (e) {
            var t = null !== e.attr("data-length"),
                n = parseInt(e.attr("data-length")),
                i = e[0].value.length;
            0 !== i || !1 !== e[0].validity.badInput || e.is(":required") ? e.hasClass("validate") && (e.is(":valid") && t && i <= n || e.is(":valid") && !t ? (e.removeClass("invalid"), e.addClass("valid")) : (e.removeClass("valid"), e.addClass("invalid"))) : e.hasClass("validate") && (e.removeClass("valid"), e.removeClass("invalid"))
        }, M.textareaAutoResize = function (e) {
            if (e instanceof Element && (e = d(e)), e.length) {
                var t = d(".hiddendiv").first();
                t.length || (t = d('<div class="hiddendiv common"></div>'), d("body").append(t));
                var n = e.css("font-family"),
                    i = e.css("font-size"),
                    o = e.css("line-height"),
                    a = e.css("padding-top"),
                    s = e.css("padding-right"),
                    r = e.css("padding-bottom"),
                    l = e.css("padding-left");
                i && t.css("font-size", i), n && t.css("font-family", n), o && t.css("line-height", o), a && t.css("padding-top", a), s && t.css("padding-right", s), r && t.css("padding-bottom", r), l && t.css("padding-left", l), e.data("original-height") || e.data("original-height", e.height()), "off" === e.attr("wrap") && t.css("overflow-wrap", "normal").css("white-space", "pre"), t.text(e[0].value + "\n");
                var u = t.html().replace(/\n/g, "<br>");
                t.html(u), 0 < e[0].offsetWidth && 0 < e[0].offsetHeight ? t.css("width", e.width() + "px") : t.css("width", window.innerWidth / 2 + "px"), e.data("original-height") <= t.innerHeight() ? e.css("height", t.innerHeight() + "px") : e[0].value.length < e.data("previous-length") && e.css("height", e.data("original-height") + "px"), e.data("previous-length", e[0].value.length)
            } else console.error("No textarea element found")
        }, d(document).ready(function () {
            var i = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
            d(document).on("change", i, function () {
                0 === this.value.length && null === d(this).attr("placeholder") || d(this).siblings("label").addClass("active"), M.validate_field(d(this))
            }), d(document).ready(function () {
                M.updateTextFields()
            }), d(document).on("reset", function (e) {
                var t = d(e.target);
                t.is("form") && (t.find(i).removeClass("valid").removeClass("invalid"), t.find(i).each(function () {
                    this.value.length && d(this).siblings("label").removeClass("active")
                }), setTimeout(function () {
                    t.find("select").each(function () {
                        this.M_FormSelect && d(this).trigger("change")
                    })
                }, 0))
            }), document.addEventListener("focus", function (e) {
                d(e.target).is(i) && d(e.target).siblings("label, .prefix").addClass("active")
            }, !0), document.addEventListener("blur", function (e) {
                var t = d(e.target);
                if (t.is(i)) {
                    var n = ".prefix";
                    0 === t[0].value.length && !0 !== t[0].validity.badInput && null === t.attr("placeholder") && (n += ", label"), t.siblings(n).removeClass("active"), M.validate_field(t)
                }
            }, !0);
            var e = "input[type=radio], input[type=checkbox]";
            d(document).on("keyup", e, function (e) {
                if (e.which === M.keys.TAB) return d(this).addClass("tabbed"), void d(this).one("blur", function () {
                    d(this).removeClass("tabbed")
                })
            });
            var t = ".materialize-textarea";
            d(t).each(function () {
                var e = d(this);
                e.data("original-height", e.height()), e.data("previous-length", this.value.length), M.textareaAutoResize(e)
            }), d(document).on("keyup", t, function () {
                M.textareaAutoResize(d(this))
            }), d(document).on("keydown", t, function () {
                M.textareaAutoResize(d(this))
            }), d(document).on("change", '.file-field input[type="file"]', function () {
                for (var e = d(this).closest(".file-field").find("input.file-path"), t = d(this)[0].files, n = [], i = 0; i < t.length; i++) n.push(t[i].name);
                e[0].value = n.join(", "), e.trigger("change")
            })
        })
    }(cash),
    function (o, a) {
        "use strict";
        var e = {
            indicators: !0,
            height: 400,
            duration: 500,
            interval: 6e3
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Slider = n).options = o.extend({}, i.defaults, t), n.$slider = n.$el.find(".slides"), n.$slides = n.$slider.children("li"), n.activeIndex = n.$slides.filter(function (e) {
                        return o(e).hasClass("active")
                    }).first().index(), -1 != n.activeIndex && (n.$active = n.$slides.eq(n.activeIndex)), n._setSliderHeight(), n.$slides.find(".caption").each(function (e) {
                        n._animateCaptionIn(e, 0)
                    }), n.$slides.find("img").each(function (e) {
                        var t = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                        o(e).attr("src") !== t && (o(e).css("background-image", 'url("' + o(e).attr("src") + '")'), o(e).attr("src", t))
                    }), n._setupIndicators(), n.$active ? n.$active.css("display", "block") : (n.$slides.first().addClass("active"), a({
                        targets: n.$slides.first()[0],
                        opacity: 1,
                        duration: n.options.duration,
                        easing: "easeOutQuad"
                    }), n.activeIndex = 0, n.$active = n.$slides.eq(n.activeIndex), n.options.indicators && n.$indicators.eq(n.activeIndex).addClass("active")), n.$active.find("img").each(function () {
                        a({
                            targets: n.$active.find(".caption")[0],
                            opacity: 1,
                            translateX: 0,
                            translateY: 0,
                            duration: n.options.duration,
                            easing: "easeOutQuad"
                        })
                    }), n._setupEventHandlers(), n.start(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this.pause(), this._removeIndicators(), this._removeEventHandlers(), this.el.M_Slider = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        var t = this;
                        this._handleIntervalBound = this._handleInterval.bind(this), this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this), this.options.indicators && this.$indicators.each(function (e) {
                            e.addEventListener("click", t._handleIndicatorClickBound)
                        })
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        var t = this;
                        this.options.indicators && this.$indicators.each(function (e) {
                            e.removeEventListener("click", t._handleIndicatorClickBound)
                        })
                    }
                }, {
                    key: "_handleIndicatorClick",
                    value: function (e) {
                        var t = o(e.target).index();
                        this.set(t)
                    }
                }, {
                    key: "_handleInterval",
                    value: function () {
                        var e = this.$slider.find(".active").index();
                        this.$slides.length === e + 1 ? e = 0 : e += 1, this.set(e)
                    }
                }, {
                    key: "_animateCaptionIn",
                    value: function (e, t) {
                        var n = {
                            targets: e,
                            opacity: 0,
                            duration: t,
                            easing: "easeOutQuad"
                        };
                        o(e).hasClass("center-align") ? n.translateY = -100 : o(e).hasClass("right-align") ? n.translateX = 100 : o(e).hasClass("left-align") && (n.translateX = -100), a(n)
                    }
                }, {
                    key: "_setSliderHeight",
                    value: function () {
                        this.$el.hasClass("fullscreen") || (this.options.indicators ? this.$el.css("height", this.options.height + 40 + "px") : this.$el.css("height", this.options.height + "px"), this.$slider.css("height", this.options.height + "px"))
                    }
                }, {
                    key: "_setupIndicators",
                    value: function () {
                        var t = this;
                        this.options.indicators && (this.$indicators = o('<ul class="indicators"></ul>'), this.$slides.each(function () {
                            var e = o('<li class="indicator-item"></li>');
                            t.$indicators.append(e[0])
                        }), this.$el.append(this.$indicators[0]), this.$indicators = this.$indicators.children("li.indicator-item"))
                    }
                }, {
                    key: "_removeIndicators",
                    value: function () {
                        this.$el.find("ul.indicators").remove()
                    }
                }, {
                    key: "set",
                    value: function (e) {
                        var t = this;
                        if (e >= this.$slides.length ? e = 0 : e < 0 && (e = this.$slides.length - 1), this.activeIndex != e) {
                            this.$active = this.$slides.eq(this.activeIndex);
                            var n = this.$active.find(".caption");
                            this.$active.removeClass("active"), a({
                                targets: this.$active[0],
                                opacity: 0,
                                duration: this.options.duration,
                                easing: "easeOutQuad",
                                complete: function () {
                                    t.$slides.not(".active").each(function (e) {
                                        a({
                                            targets: e,
                                            opacity: 0,
                                            translateX: 0,
                                            translateY: 0,
                                            duration: 0,
                                            easing: "easeOutQuad"
                                        })
                                    })
                                }
                            }), this._animateCaptionIn(n[0], this.options.duration), this.options.indicators && (this.$indicators.eq(this.activeIndex).removeClass("active"), this.$indicators.eq(e).addClass("active")), a({
                                targets: this.$slides.eq(e)[0],
                                opacity: 1,
                                duration: this.options.duration,
                                easing: "easeOutQuad"
                            }), a({
                                targets: this.$slides.eq(e).find(".caption")[0],
                                opacity: 1,
                                translateX: 0,
                                translateY: 0,
                                duration: this.options.duration,
                                delay: this.options.duration,
                                easing: "easeOutQuad"
                            }), this.$slides.eq(e).addClass("active"), this.activeIndex = e, this.start()
                        }
                    }
                }, {
                    key: "pause",
                    value: function () {
                        clearInterval(this.interval)
                    }
                }, {
                    key: "start",
                    value: function () {
                        clearInterval(this.interval), this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval)
                    }
                }, {
                    key: "next",
                    value: function () {
                        var e = this.activeIndex + 1;
                        e >= this.$slides.length ? e = 0 : e < 0 && (e = this.$slides.length - 1), this.set(e)
                    }
                }, {
                    key: "prev",
                    value: function () {
                        var e = this.activeIndex - 1;
                        e >= this.$slides.length ? e = 0 : e < 0 && (e = this.$slides.length - 1), this.set(e)
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Slider
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        M.Slider = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "slider", "M_Slider")
    }(cash, M.anime),
    function (i, o) {
        i(document).on("click", ".card", function (e) {
            if (i(this).children(".card-reveal").length) {
                var n = i(e.target).closest(".card");
                n.data("initialOverflow") === undefined && n.data("initialOverflow", n.css("overflow") === undefined ? "" : n.css("overflow"));
                var t = i(this).find(".card-reveal");
                i(e.target).is(i(".card-reveal .card-title")) || i(e.target).is(i(".card-reveal .card-title i")) ? o({
                    targets: t[0],
                    translateY: 0,
                    duration: 225,
                    easing: "easeInOutQuad",
                    complete: function (e) {
                        var t = e.animatables[0].target;
                        i(t).css({
                            display: "none"
                        }), n.css("overflow", n.data("initialOverflow"))
                    }
                }) : (i(e.target).is(i(".card .activator")) || i(e.target).is(i(".card .activator i"))) && (n.css("overflow", "hidden"), t.css({
                    display: "block"
                }), o({
                    targets: t[0],
                    translateY: "-100%",
                    duration: 300,
                    easing: "easeInOutQuad"
                }))
            }
        })
    }(cash, M.anime),
    function (u) {
        "use strict";
        var e = {
            data: [],
            placeholder: "",
            secondaryPlaceholder: "",
            autocompleteOptions: {},
            limit: Infinity,
            onChipAdd: null,
            onChipSelect: null,
            onChipDelete: null
        },
            t = function () {
                function l(e, t) {
                    _classCallCheck(this, l);
                    var n = _possibleConstructorReturn(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, l, e, t));
                    return (n.el.M_Chips = n).options = u.extend({}, l.defaults, t), n.$el.addClass("chips input-field"), n.chipsData = [], n.$chips = u(), n._setupInput(), n.hasAutocomplete = 0 < Object.keys(n.options.autocompleteOptions).length, n.$input.attr("id") || n.$input.attr("id", M.guid()), n.options.data.length && (n.chipsData = n.options.data, n._renderChips(n.chipsData)), n.hasAutocomplete && n._setupAutocomplete(), n._setPlaceholder(), n._setupLabel(), n._setupEventHandlers(), n
                }
                return _inherits(l, Component), _createClass(l, [{
                    key: "getData",
                    value: function () {
                        return this.chipsData
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.$chips.remove(), this.el.M_Chips = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleChipClickBound = this._handleChipClick.bind(this), this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputFocusBound = this._handleInputFocus.bind(this), this._handleInputBlurBound = this._handleInputBlur.bind(this), this.el.addEventListener("click", this._handleChipClickBound), document.addEventListener("keydown", l._handleChipsKeydown), document.addEventListener("keyup", l._handleChipsKeyup), this.el.addEventListener("blur", l._handleChipsBlur, !0), this.$input[0].addEventListener("focus", this._handleInputFocusBound), this.$input[0].addEventListener("blur", this._handleInputBlurBound), this.$input[0].addEventListener("keydown", this._handleInputKeydownBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("click", this._handleChipClickBound), document.removeEventListener("keydown", l._handleChipsKeydown), document.removeEventListener("keyup", l._handleChipsKeyup), this.el.removeEventListener("blur", l._handleChipsBlur, !0), this.$input[0].removeEventListener("focus", this._handleInputFocusBound), this.$input[0].removeEventListener("blur", this._handleInputBlurBound), this.$input[0].removeEventListener("keydown", this._handleInputKeydownBound)
                    }
                }, {
                    key: "_handleChipClick",
                    value: function (e) {
                        var t = u(e.target).closest(".chip"),
                            n = u(e.target).is(".close");
                        if (t.length) {
                            var i = t.index();
                            n ? (this.deleteChip(i), this.$input[0].focus()) : this.selectChip(i)
                        } else this.$input[0].focus()
                    }
                }, {
                    key: "_handleInputFocus",
                    value: function () {
                        this.$el.addClass("focus")
                    }
                }, {
                    key: "_handleInputBlur",
                    value: function () {
                        this.$el.removeClass("focus")
                    }
                }, {
                    key: "_handleInputKeydown",
                    value: function (e) {
                        if (l._keydown = !0, 13 === e.keyCode) {
                            if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) return;
                            e.preventDefault(), this.addChip({
                                tag: this.$input[0].value
                            }), this.$input[0].value = ""
                        } else 8 !== e.keyCode && 37 !== e.keyCode || "" !== this.$input[0].value || !this.chipsData.length || (e.preventDefault(), this.selectChip(this.chipsData.length - 1))
                    }
                }, {
                    key: "_renderChip",
                    value: function (e) {
                        if (e.tag) {
                            var t = document.createElement("div"),
                                n = document.createElement("i");
                            if (t.classList.add("chip"), t.textContent = e.tag, t.setAttribute("tabindex", 0), u(n).addClass("material-icons close"), n.textContent = "close", e.image) {
                                var i = document.createElement("img");
                                i.setAttribute("src", e.image), t.insertBefore(i, t.firstChild)
                            }
                            return t.appendChild(n), t
                        }
                    }
                }, {
                    key: "_renderChips",
                    value: function () {
                        this.$chips.remove();
                        for (var e = 0; e < this.chipsData.length; e++) {
                            var t = this._renderChip(this.chipsData[e]);
                            this.$el.append(t), this.$chips.add(t)
                        }
                        this.$el.append(this.$input[0])
                    }
                }, {
                    key: "_setupAutocomplete",
                    value: function () {
                        var t = this;
                        this.options.autocompleteOptions.onAutocomplete = function (e) {
                            t.addChip({
                                tag: e
                            }), t.$input[0].value = "", t.$input[0].focus()
                        }, this.autocomplete = M.Autocomplete.init(this.$input[0], this.options.autocompleteOptions)
                    }
                }, {
                    key: "_setupInput",
                    value: function () {
                        this.$input = this.$el.find("input"), this.$input.length || (this.$input = u("<input></input>"), this.$el.append(this.$input)), this.$input.addClass("input")
                    }
                }, {
                    key: "_setupLabel",
                    value: function () {
                        this.$label = this.$el.find("label"), this.$label.length && this.$label.setAttribute("for", this.$input.attr("id"))
                    }
                }, {
                    key: "_setPlaceholder",
                    value: function () {
                        this.chipsData !== undefined && !this.chipsData.length && this.options.placeholder ? u(this.$input).prop("placeholder", this.options.placeholder) : (this.chipsData === undefined || this.chipsData.length) && this.options.secondaryPlaceholder && u(this.$input).prop("placeholder", this.options.secondaryPlaceholder)
                    }
                }, {
                    key: "_isValid",
                    value: function (e) {
                        if (e.hasOwnProperty("tag") && "" !== e.tag) {
                            for (var t = !1, n = 0; n < this.chipsData.length; n++)
                                if (this.chipsData[n].tag === e.tag) {
                                    t = !0;
                                    break
                                }
                            return !t
                        }
                        return !1
                    }
                }, {
                    key: "addChip",
                    value: function (e) {
                        if (this._isValid(e) && !(this.chipsData.length >= this.options.limit)) {
                            var t = this._renderChip(e);
                            this.$chips.add(t),
                                this.chipsData.push(e), u(this.$input).before(t), this._setPlaceholder(), "function" == typeof this.options.onChipAdd && this.options.onChipAdd.call(this, this.$el, t)
                        }
                    }
                }, {
                    key: "deleteChip",
                    value: function (e) {
                        var t = this.$chips.eq(e);
                        this.$chips.eq(e).remove(), this.$chips = this.$chips.filter(function (e) {
                            return 0 <= u(e).index()
                        }), this.chipsData.splice(e, 1), this._setPlaceholder(), "function" == typeof this.options.onChipDelete && this.options.onChipDelete.call(this, this.$el, t[0])
                    }
                }, {
                    key: "selectChip",
                    value: function (e) {
                        var t = this.$chips.eq(e);
                        (this._selectedChip = t)[0].focus(), "function" == typeof this.options.onChipSelect && this.options.onChipSelect.call(this, this.$el, t[0])
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(l.__proto__ || Object.getPrototypeOf(l), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Chips
                    }
                }, {
                    key: "_handleChipsKeydown",
                    value: function (e) {
                        l._keydown = !0;
                        var t = u(e.target).closest(".chips"),
                            n = e.target && t.length;
                        if (!u(e.target).is("input, textarea") && n) {
                            var i = t[0].M_Chips;
                            if (8 === e.keyCode || 46 === e.keyCode) {
                                e.preventDefault();
                                var o = i.chipsData.length;
                                if (i._selectedChip) {
                                    var a = i._selectedChip.index();
                                    i.deleteChip(a), i._selectedChip = null, o = Math.max(a - 1, 0)
                                }
                                i.chipsData.length && i.selectChip(o)
                            } else if (37 === e.keyCode) {
                                if (i._selectedChip) {
                                    var s = i._selectedChip.index() - 1;
                                    if (s < 0) return;
                                    i.selectChip(s)
                                }
                            } else if (39 === e.keyCode && i._selectedChip) {
                                var r = i._selectedChip.index() + 1;
                                r >= i.chipsData.length ? i.$input[0].focus() : i.selectChip(r)
                            }
                        }
                    }
                }, {
                    key: "_handleChipsKeyup",
                    value: function () {
                        l._keydown = !1
                    }
                }, {
                    key: "_handleChipsBlur",
                    value: function (e) {
                        l._keydown || (u(e.target).closest(".chips")[0].M_Chips._selectedChip = null)
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), l
            }();
        t._keydown = !1, M.Chips = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "chips", "M_Chips"), u(document).ready(function () {
            u(document.body).on("click", ".chip .close", function () {
                var e = u(this).closest(".chips");
                e.length && e[0].M_Chips || u(this).closest(".chip").remove()
            })
        })
    }(cash),
    function (o) {
        "use strict";
        var e = {
            top: 0,
            bottom: Infinity,
            offset: 0,
            onPositionChange: null
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Pushpin = n).options = o.extend({}, i.defaults, t), n.originalOffset = n.el.offsetTop, i._pushpins.push(n), n._setupEventHandlers(), n._updatePosition(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this.el.style.top = null, this._removePinClasses(), this._removeEventHandlers();
                        var e = i._pushpins.indexOf(this);
                        i._pushpins.splice(e, 1)
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        document.addEventListener("scroll", i._updateElements)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        document.removeEventListener("scroll", i._updateElements)
                    }
                }, {
                    key: "_updatePosition",
                    value: function () {
                        var e = M.getDocumentScrollTop() + this.options.offset;
                        this.options.top <= e && this.options.bottom >= e && !this.el.classList.contains("pinned") && (this._removePinClasses(), this.el.style.top = this.options.offset + "px", this.el.classList.add("pinned"), "function" == typeof this.options.onPositionChange && this.options.onPositionChange.call(this, "pinned")), e < this.options.top && !this.el.classList.contains("pin-top") && (this._removePinClasses(), this.el.style.top = 0, this.el.classList.add("pin-top"), "function" == typeof this.options.onPositionChange && this.options.onPositionChange.call(this, "pin-top")), e > this.options.bottom && !this.el.classList.contains("pin-bottom") && (this._removePinClasses(), this.el.classList.add("pin-bottom"), this.el.style.top = this.options.bottom - this.originalOffset + "px", "function" == typeof this.options.onPositionChange && this.options.onPositionChange.call(this, "pin-bottom"))
                    }
                }, {
                    key: "_removePinClasses",
                    value: function () {
                        this.el.classList.remove("pin-top"), this.el.classList.remove("pinned"), this.el.classList.remove("pin-bottom")
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Pushpin
                    }
                }, {
                    key: "_updateElements",
                    value: function () {
                        for (var e in i._pushpins) {
                            i._pushpins[e]._updatePosition()
                        }
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        t._pushpins = [], M.Pushpin = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "pushpin", "M_Pushpin")
    }(cash),
    function (r, o) {
        "use strict";
        var e = {
            direction: "top",
            hoverEnabled: !0,
            toolbarEnabled: !1
        };
        r.fn.reverse = [].reverse;
        var t = function () {
            function i(e, t) {
                _classCallCheck(this, i);
                var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                return (n.el.M_FloatingActionButton = n).options = r.extend({}, i.defaults, t), n.isOpen = !1, n.$anchor = n.$el.children("a").first(), n.$menu = n.$el.children("ul").first(), n.$floatingBtns = n.$el.find("ul .btn-floating"), n.$floatingBtnsReverse = n.$el.find("ul .btn-floating").reverse(), n.offsetY = 0, n.offsetX = 0, n.$el.addClass("direction-" + n.options.direction), "top" === n.options.direction ? n.offsetY = 40 : "right" === n.options.direction ? n.offsetX = -40 : "bottom" === n.options.direction ? n.offsetY = -40 : n.offsetX = 40, n._setupEventHandlers(), n
            }
            return _inherits(i, Component), _createClass(i, [{
                key: "destroy",
                value: function () {
                    this._removeEventHandlers(), this.el.M_FloatingActionButton = undefined
                }
            }, {
                key: "_setupEventHandlers",
                value: function () {
                    this._handleFABClickBound = this._handleFABClick.bind(this), this._handleOpenBound = this.open.bind(this), this._handleCloseBound = this.close.bind(this), this.options.hoverEnabled && !this.options.toolbarEnabled ? (this.el.addEventListener("mouseenter", this._handleOpenBound), this.el.addEventListener("mouseleave", this._handleCloseBound)) : this.el.addEventListener("click", this._handleFABClickBound)
                }
            }, {
                key: "_removeEventHandlers",
                value: function () {
                    this.options.hoverEnabled && !this.options.toolbarEnabled ? (this.el.removeEventListener("mouseenter", this._handleOpenBound), this.el.removeEventListener("mouseleave", this._handleCloseBound)) : this.el.removeEventListener("click", this._handleFABClickBound)
                }
            }, {
                key: "_handleFABClick",
                value: function () {
                    this.isOpen ? this.close() : this.open()
                }
            }, {
                key: "_handleDocumentClick",
                value: function (e) {
                    r(e.target).closest(this.$menu).length || this.close()
                }
            }, {
                key: "open",
                value: function () {
                    this.isOpen || (this.options.toolbarEnabled ? this._animateInToolbar() : this._animateInFAB(), this.isOpen = !0)
                }
            }, {
                key: "close",
                value: function () {
                    this.isOpen && (this.options.toolbarEnabled ? (window.removeEventListener("scroll", this._handleCloseBound, !0), document.body.removeEventListener("click", this._handleDocumentClickBound, !0), this._animateOutToolbar()) : this._animateOutFAB(), this.isOpen = !1)
                }
            }, {
                key: "_animateInFAB",
                value: function () {
                    var t = this;
                    this.$el.addClass("active");
                    var n = 0;
                    this.$floatingBtnsReverse.each(function (e) {
                        o({
                            targets: e,
                            opacity: 1,
                            scale: [.4, 1],
                            translateY: [t.offsetY, 0],
                            translateX: [t.offsetX, 0],
                            duration: 275,
                            delay: n,
                            easing: "easeInOutQuad"
                        }), n += 40
                    })
                }
            }, {
                key: "_animateOutFAB",
                value: function () {
                    var t = this;
                    this.$floatingBtnsReverse.each(function (e) {
                        o.remove(e), o({
                            targets: e,
                            opacity: 0,
                            scale: .4,
                            translateY: t.offsetY,
                            translateX: t.offsetX,
                            duration: 175,
                            easing: "easeOutQuad",
                            complete: function () {
                                t.$el.removeClass("active")
                            }
                        })
                    })
                }
            }, {
                key: "_animateInToolbar",
                value: function () {
                    var e = this,
                        t = void 0,
                        n = window.innerWidth,
                        i = window.innerHeight,
                        o = this.el.getBoundingClientRect(),
                        a = r('<div class="fab-backdrop"></div>'),
                        s = this.$anchor.css("background-color");
                    this.$anchor.append(a), this.offsetX = o.left - n / 2 + o.width / 2, this.offsetY = i - o.bottom, t = n / a[0].clientWidth, this.btnBottom = o.bottom, this.btnLeft = o.left, this.btnWidth = o.width, this.$el.addClass("active"), this.$el.css({
                        "text-align": "center",
                        width: "100%",
                        bottom: 0,
                        left: 0,
                        transform: "translateX(" + this.offsetX + "px)",
                        transition: "none"
                    }), this.$anchor.css({
                        transform: "translateY(" + -this.offsetY + "px)",
                        transition: "none"
                    }), a.css({
                        "background-color": s
                    }), setTimeout(function () {
                        e.$el.css({
                            transform: "",
                            transition: "transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s"
                        }), e.$anchor.css({
                            overflow: "visible",
                            transform: "",
                            transition: "transform .2s"
                        }), setTimeout(function () {
                            e.$el.css({
                                overflow: "hidden",
                                "background-color": s
                            }), a.css({
                                transform: "scale(" + t + ")",
                                transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
                            }), e.$menu.children("li").children("a").css({
                                opacity: 1
                            }), e._handleDocumentClickBound = e._handleDocumentClick.bind(e), window.addEventListener("scroll", e._handleCloseBound, !0), document.body.addEventListener("click", e._handleDocumentClickBound, !0)
                        }, 100)
                    }, 0)
                }
            }, {
                key: "_animateOutToolbar",
                value: function () {
                    var e = this,
                        t = window.innerWidth,
                        n = window.innerHeight,
                        i = this.$el.find(".fab-backdrop"),
                        o = this.$anchor.css("background-color");
                    this.offsetX = this.btnLeft - t / 2 + this.btnWidth / 2, this.offsetY = n - this.btnBottom, this.$el.removeClass("active"), this.$el.css({
                        "background-color": "transparent",
                        transition: "none"
                    }), this.$anchor.css({
                        transition: "none"
                    }), i.css({
                        transform: "scale(0)",
                        "background-color": o
                    }), this.$menu.children("li").children("a").css({
                        opacity: ""
                    }), setTimeout(function () {
                        i.remove(), e.$el.css({
                            "text-align": "",
                            width: "",
                            bottom: "",
                            left: "",
                            overflow: "",
                            "background-color": "",
                            transform: "translate3d(" + -e.offsetX + "px,0,0)"
                        }), e.$anchor.css({
                            overflow: "",
                            transform: "translate3d(0," + e.offsetY + "px,0)"
                        }), setTimeout(function () {
                            e.$el.css({
                                transform: "translate3d(0,0,0)",
                                transition: "transform .2s"
                            }), e.$anchor.css({
                                transform: "translate3d(0,0,0)",
                                transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
                            })
                        }, 20)
                    }, 200)
                }
            }], [{
                key: "init",
                value: function (e, t) {
                    return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                }
            }, {
                key: "getInstance",
                value: function (e) {
                    return (e.jquery ? e[0] : e).M_FloatingActionButton
                }
            }, {
                key: "defaults",
                get: function () {
                    return e
                }
            }]), i
        }();
        M.FloatingActionButton = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "floatingActionButton", "M_FloatingActionButton")
    }(cash, M.anime),
    function (g) {
        "use strict";
        var e = {
            autoClose: !1,
            format: "mmm dd, yyyy",
            parse: null,
            defaultDate: null,
            setDefaultDate: !1,
            disableWeekends: !1,
            disableDayFn: null,
            firstDay: 0,
            minDate: null,
            maxDate: null,
            yearRange: 10,
            minYear: 0,
            maxYear: 9999,
            minMonth: undefined,
            maxMonth: undefined,
            startRange: null,
            endRange: null,
            isRTL: !1,
            showMonthAfterYear: !1,
            showDaysInNextAndPreviousMonths: !1,
            container: null,
            showClearBtn: !1,
            i18n: {
                cancel: "Cancel",
                clear: "Clear",
                done: "Ok",
                previousMonth: "\u2039",
                nextMonth: "\u203a",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"]
            },
            events: [],
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null
        },
            t = function () {
                function O(e, t) {
                    _classCallCheck(this, O);
                    var n = _possibleConstructorReturn(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, O, e, t));
                    (n.el.M_Datepicker = n).options = g.extend({}, O.defaults, t), t && t.hasOwnProperty("i18n") && "object" == typeof t.i18n && (n.options.i18n = g.extend({}, O.defaults.i18n, t.i18n)), n.options.minDate && n.options.minDate.setHours(0, 0, 0, 0), n.options.maxDate && n.options.maxDate.setHours(0, 0, 0, 0), n.id = M.guid(), n._setupVariables(), n._insertHTMLIntoDOM(), n._setupModal(), n._setupEventHandlers(), n.options.defaultDate || (n.options.defaultDate = new Date(Date.parse(n.el.value)));
                    var i = n.options.defaultDate;
                    return O._isDate(i) ? n.options.setDefaultDate ? (n.setDate(i, !0), n.setInputValue()) : n.gotoDate(i) : n.gotoDate(new Date), n.isOpen = !1, n
                }
                return _inherits(O, Component), _createClass(O, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.modal.destroy(), g(this.modalEl).remove(), this.destroySelects(), this.el.M_Datepicker = undefined
                    }
                }, {
                    key: "destroySelects",
                    value: function () {
                        var e = this.calendarEl.querySelector(".orig-select-year");
                        e && M.FormSelect.getInstance(e).destroy();
                        var t = this.calendarEl.querySelector(".orig-select-month");
                        t && M.FormSelect.getInstance(t).destroy()
                    }
                }, {
                    key: "_insertHTMLIntoDOM",
                    value: function () {
                        this.options.showClearBtn && (g(this.clearBtn).css({
                            visibility: ""
                        }), this.clearBtn.innerHTML = this.options.i18n.clear), this.doneBtn.innerHTML = this.options.i18n.done, this.cancelBtn.innerHTML = this.options.i18n.cancel, this.options.container ? this.$modalEl.appendTo(this.options.container) : this.$modalEl.insertBefore(this.el)
                    }
                }, {
                    key: "_setupModal",
                    value: function () {
                        var e = this;
                        this.modalEl.id = "modal-" + this.id, this.modal = M.Modal.init(this.modalEl, {
                            onCloseEnd: function () {
                                e.isOpen = !1
                            }
                        })
                    }
                }, {
                    key: "toString",
                    value: function (e) {
                        var t = this;
                        return e = e || this.options.format, O._isDate(this.date) ? e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g).map(function (e) {
                            return t.formats[e] ? t.formats[e]() : e
                        }).join("") : ""
                    }
                }, {
                    key: "setDate",
                    value: function (e, t) {
                        if (!e) return this.date = null, this._renderDateDisplay(), this.draw();
                        if ("string" == typeof e && (e = new Date(Date.parse(e))), O._isDate(e)) {
                            var n = this.options.minDate,
                                i = this.options.maxDate;
                            O._isDate(n) && e < n ? e = n : O._isDate(i) && i < e && (e = i), this.date = new Date(e.getTime()), this._renderDateDisplay(), O._setToStartOfDay(this.date), this.gotoDate(this.date), t || "function" != typeof this.options.onSelect || this.options.onSelect.call(this, this.date)
                        }
                    }
                }, {
                    key: "setInputValue",
                    value: function () {
                        this.el.value = this.toString(), this.$el.trigger("change", {
                            firedBy: this
                        })
                    }
                }, {
                    key: "_renderDateDisplay",
                    value: function () {
                        var e = O._isDate(this.date) ? this.date : new Date,
                            t = this.options.i18n,
                            n = t.weekdaysShort[e.getDay()],
                            i = t.monthsShort[e.getMonth()],
                            o = e.getDate();
                        this.yearTextEl.innerHTML = e.getFullYear(), this.dateTextEl.innerHTML = n + ", " + i + " " + o
                    }
                }, {
                    key: "gotoDate",
                    value: function (e) {
                        var t = !0;
                        if (O._isDate(e)) {
                            if (this.calendars) {
                                var n = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                                    i = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                                    o = e.getTime();
                                i.setMonth(i.getMonth() + 1), i.setDate(i.getDate() - 1), t = o < n.getTime() || i.getTime() < o
                            }
                            t && (this.calendars = [{
                                month: e.getMonth(),
                                year: e.getFullYear()
                            }]), this.adjustCalendars()
                        }
                    }
                }, {
                    key: "adjustCalendars",
                    value: function () {
                        this.calendars[0] = this.adjustCalendar(this.calendars[0]), this.draw()
                    }
                }, {
                    key: "adjustCalendar",
                    value: function (e) {
                        return e.month < 0 && (e.year -= Math.ceil(Math.abs(e.month) / 12), e.month += 12), 11 < e.month && (e.year += Math.floor(Math.abs(e.month) / 12), e.month -= 12), e
                    }
                }, {
                    key: "nextMonth",
                    value: function () {
                        this.calendars[0].month++ , this.adjustCalendars()
                    }
                }, {
                    key: "prevMonth",
                    value: function () {
                        this.calendars[0].month-- , this.adjustCalendars()
                    }
                }, {
                    key: "render",
                    value: function (e, t, n) {
                        var i = this.options,
                            o = new Date,
                            a = O._getDaysInMonth(e, t),
                            s = new Date(e, t, 1).getDay(),
                            r = [],
                            l = [];
                        O._setToStartOfDay(o), 0 < i.firstDay && (s -= i.firstDay) < 0 && (s += 7);
                        for (var u = 0 === t ? 11 : t - 1, d = 11 === t ? 0 : t + 1, c = 0 === t ? e - 1 : e, h = 11 === t ? e + 1 : e, p = O._getDaysInMonth(c, u), f = a + s, m = f; 7 < m;) m -= 7;
                        f += 7 - m;
                        for (var v = !1, g = 0, y = 0; g < f; g++) {
                            var b = new Date(e, t, g - s + 1),
                                _ = !!O._isDate(this.date) && O._compareDates(b, this.date),
                                w = O._compareDates(b, o),
                                x = -1 !== i.events.indexOf(b.toDateString()),
                                C = g < s || a + s <= g,
                                k = g - s + 1,
                                E = t,
                                T = e,
                                M = i.startRange && O._compareDates(i.startRange, b),
                                S = i.endRange && O._compareDates(i.endRange, b),
                                L = i.startRange && i.endRange && i.startRange < b && b < i.endRange;
                            C && (g < s ? (k = p + k, E = u, T = c) : (k -= a, E = d, T = h));
                            var D = {
                                day: k,
                                month: E,
                                year: T,
                                hasEvent: x,
                                isSelected: _,
                                isToday: w,
                                isDisabled: i.minDate && b < i.minDate || i.maxDate && b > i.maxDate || i.disableWeekends && O._isWeekend(b) || i.disableDayFn && i.disableDayFn(b),
                                isEmpty: C,
                                isStartRange: M,
                                isEndRange: S,
                                isInRange: L,
                                showDaysInNextAndPreviousMonths: i.showDaysInNextAndPreviousMonths
                            };
                            l.push(this.renderDay(D)), 7 == ++y && (r.push(this.renderRow(l, i.isRTL, v)), y = 0, v = !(l = []))
                        }
                        return this.renderTable(i, r, n)
                    }
                }, {
                    key: "renderDay",
                    value: function (e) {
                        var t = [],
                            n = "false";
                        if (e.isEmpty) {
                            if (!e.showDaysInNextAndPreviousMonths) return '<td class="is-empty"></td>';
                            t.push("is-outside-current-month"), t.push("is-selection-disabled")
                        }
                        return e.isDisabled && t.push("is-disabled"), e.isToday && t.push("is-today"), e.isSelected && (t.push("is-selected"), n = "true"), e.hasEvent && t.push("has-event"), e.isInRange && t.push("is-inrange"), e.isStartRange && t.push("is-startrange"), e.isEndRange && t.push("is-endrange"), '<td data-day="' + e.day + '" class="' + t.join(" ") + '" aria-selected="' + n + '"><button class="datepicker-day-button" type="button" data-year="' + e.year + '" data-month="' + e.month + '" data-day="' + e.day + '">' + e.day + "</button></td>"
                    }
                }, {
                    key: "renderRow",
                    value: function (e, t, n) {
                        return '<tr class="datepicker-row' + (n ? " is-selected" : "") + '">' + (t ? e.reverse() : e).join("") + "</tr>"
                    }
                }, {
                    key: "renderTable",
                    value: function (e, t, n) {
                        return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' + n + '">' + this.renderHead(e) + this.renderBody(t) + "</table></div>"
                    }
                }, {
                    key: "renderHead",
                    value: function (e) {
                        var t = void 0,
                            n = [];
                        for (t = 0; t < 7; t++) n.push('<th scope="col"><abbr title="' + this.renderDayName(e, t) + '">' + this.renderDayName(e, t, !0) + "</abbr></th>");
                        return "<thead><tr>" + (e.isRTL ? n.reverse() : n).join("") + "</tr></thead>"
                    }
                }, {
                    key: "renderBody",
                    value: function (e) {
                        return "<tbody>" + e.join("") + "</tbody>"
                    }
                }, {
                    key: "renderTitle",
                    value: function (e, t, n, i, o, a) {
                        var s = void 0,
                            r = void 0,
                            l = void 0,
                            u = this.options,
                            d = n === u.minYear,
                            c = n === u.maxYear,
                            h = '<div id="' + a + '" class="datepicker-controls" role="heading" aria-live="assertive">',
                            p = void 0,
                            f = void 0,
                            m = !0,
                            v = !0;
                        for (l = [], s = 0; s < 12; s++) l.push('<option value="' + (n === o ? s - t : 12 + s - t) + '"' + (s === i ? ' selected="selected"' : "") + (d && s < u.minMonth || c && s > u.maxMonth ? 'disabled="disabled"' : "") + ">" + u.i18n.months[s] + "</option>");
                        for (p = '<select class="datepicker-select orig-select-month" tabindex="-1">' + l.join("") + "</select>", g.isArray(u.yearRange) ? (s = u.yearRange[0], r = u.yearRange[1] + 1) : (s = n - u.yearRange, r = 1 + n + u.yearRange), l = []; s < r && s <= u.maxYear; s++) s >= u.minYear && l.push('<option value="' + s + '" ' + (s === n ? 'selected="selected"' : "") + ">" + s + "</option>");
                        return f = '<select class="datepicker-select orig-select-year" tabindex="-1">' + l.join("") + "</select>", h += '<button class="month-prev' + (m ? "" : " is-disabled") + '" type="button">' + '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>' + "</button>", h += '<div class="selects-container">', u.showMonthAfterYear ? h += f + p : h += p + f, h += "</div>", d && (0 === i || u.minMonth >= i) && (m = !1), c && (11 === i || u.maxMonth <= i) && (v = !1), (h += '<button class="month-next' + (v ? "" : " is-disabled") + '" type="button">' + '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>' + "</button>") + "</div>"
                    }
                }, {
                    key: "draw",
                    value: function (e) {
                        if (this.isOpen || e) {
                            var t = this.options,
                                n = t.minYear,
                                i = t.maxYear,
                                o = t.minMonth,
                                a = t.maxMonth,
                                s = "",
                                r = void 0;
                            this._y <= n && (this._y = n, !isNaN(o) && this._m < o && (this._m = o)), this._y >= i && (this._y = i, !isNaN(a) && this._m > a && (this._m = a)), r = "datepicker-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
                            for (var l = 0; l < 1; l++) this._renderDateDisplay(), s += this.renderTitle(this, l, this.calendars[l].year, this.calendars[l].month, this.calendars[0].year, r) + this.render(this.calendars[l].year, this.calendars[l].month, r);
                            this.destroySelects(), this.calendarEl.innerHTML = s;
                            var u = this.calendarEl.querySelector(".orig-select-year"),
                                d = this.calendarEl.querySelector(".orig-select-month");
                            M.FormSelect.init(u, {
                                classes: "select-year",
                                dropdownOptions: {
                                    container: document.body,
                                    constrainWidth: !1
                                }
                            }), M.FormSelect.init(d, {
                                classes: "select-month",
                                dropdownOptions: {
                                    container: document.body,
                                    constrainWidth: !1
                                }
                            }), u.addEventListener("change", this._handleYearChange.bind(this)), d.addEventListener("change", this._handleMonthChange.bind(this)), "function" == typeof this.options.onDraw && this.options.onDraw(this)
                        }
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), this._handleInputChangeBound = this._handleInputChange.bind(this), this._handleCalendarClickBound = this._handleCalendarClick.bind(this), this._finishSelectionBound = this._finishSelection.bind(this), this._handleMonthChange = this._handleMonthChange.bind(this), this._closeBound = this.close.bind(this), this.el.addEventListener("click", this._handleInputClickBound), this.el.addEventListener("keydown", this._handleInputKeydownBound), this.el.addEventListener("change", this._handleInputChangeBound), this.calendarEl.addEventListener("click", this._handleCalendarClickBound), this.doneBtn.addEventListener("click", this._finishSelectionBound), this.cancelBtn.addEventListener("click", this._closeBound), this.options.showClearBtn && (this._handleClearClickBound = this._handleClearClick.bind(this), this.clearBtn.addEventListener("click", this._handleClearClickBound))
                    }
                }, {
                    key: "_setupVariables",
                    value: function () {
                        var t = this;
                        this.$modalEl = g(O._template), this.modalEl = this.$modalEl[0], this.calendarEl = this.modalEl.querySelector(".datepicker-calendar"), this.yearTextEl = this.modalEl.querySelector(".year-text"), this.dateTextEl = this.modalEl.querySelector(".date-text"), this.options.showClearBtn && (this.clearBtn = this.modalEl.querySelector(".datepicker-clear")), this.doneBtn = this.modalEl.querySelector(".datepicker-done"), this.cancelBtn = this.modalEl.querySelector(".datepicker-cancel"), this.formats = {
                            d: function () {
                                return t.date.getDate()
                            },
                            dd: function () {
                                var e = t.date.getDate();
                                return (e < 10 ? "0" : "") + e
                            },
                            ddd: function () {
                                return t.options.i18n.weekdaysShort[t.date.getDay()]
                            },
                            dddd: function () {
                                return t.options.i18n.weekdays[t.date.getDay()]
                            },
                            m: function () {
                                return t.date.getMonth() + 1
                            },
                            mm: function () {
                                var e = t.date.getMonth() + 1;
                                return (e < 10 ? "0" : "") + e
                            },
                            mmm: function () {
                                return t.options.i18n.monthsShort[t.date.getMonth()]
                            },
                            mmmm: function () {
                                return t.options.i18n.months[t.date.getMonth()]
                            },
                            yy: function () {
                                return ("" + t.date.getFullYear()).slice(2)
                            },
                            yyyy: function () {
                                return t.date.getFullYear()
                            }
                        }
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("click", this._handleInputClickBound), this.el.removeEventListener("keydown", this._handleInputKeydownBound), this.el.removeEventListener("change", this._handleInputChangeBound), this.calendarEl.removeEventListener("click", this._handleCalendarClickBound)
                    }
                }, {
                    key: "_handleInputClick",
                    value: function () {
                        this.open()
                    }
                }, {
                    key: "_handleInputKeydown",
                    value: function (e) {
                        e.which === M.keys.ENTER && (e.preventDefault(), this.open())
                    }
                }, {
                    key: "_handleCalendarClick",
                    value: function (e) {
                        if (this.isOpen) {
                            var t = g(e.target);
                            t.hasClass("is-disabled") || (!t.hasClass("datepicker-day-button") || t.hasClass("is-empty") || t.parent().hasClass("is-disabled") ? t.closest(".month-prev").length ? this.prevMonth() : t.closest(".month-next").length && this.nextMonth() : (this.setDate(new Date(e.target.getAttribute("data-year"), e.target.getAttribute("data-month"), e.target.getAttribute("data-day"))), this.options.autoClose && this._finishSelection()))
                        }
                    }
                }, {
                    key: "_handleClearClick",
                    value: function () {
                        this.date = null, this.setInputValue(), this.close()
                    }
                }, {
                    key: "_handleMonthChange",
                    value: function (e) {
                        this.gotoMonth(e.target.value)
                    }
                }, {
                    key: "_handleYearChange",
                    value: function (e) {
                        this.gotoYear(e.target.value)
                    }
                }, {
                    key: "gotoMonth",
                    value: function (e) {
                        isNaN(e) || (this.calendars[0].month = parseInt(e, 10), this.adjustCalendars())
                    }
                }, {
                    key: "gotoYear",
                    value: function (e) {
                        isNaN(e) || (this.calendars[0].year = parseInt(e, 10), this.adjustCalendars())
                    }
                }, {
                    key: "_handleInputChange",
                    value: function (e) {
                        var t = void 0;
                        e.firedBy !== this && (t = this.options.parse ? this.options.parse(this.el.value, this.options.format) : new Date(Date.parse(this.el.value)), O._isDate(t) && this.setDate(t))
                    }
                }, {
                    key: "renderDayName",
                    value: function (e, t, n) {
                        for (t += e.firstDay; 7 <= t;) t -= 7;
                        return n ? e.i18n.weekdaysAbbrev[t] : e.i18n.weekdays[t]
                    }
                }, {
                    key: "_finishSelection",
                    value: function () {
                        this.setInputValue(), this.close()
                    }
                }, {
                    key: "open",
                    value: function () {
                        if (!this.isOpen) return this.isOpen = !0, "function" == typeof this.options.onOpen && this.options.onOpen.call(this), this.draw(), this.modal.open(), this
                    }
                }, {
                    key: "close",
                    value: function () {
                        if (this.isOpen) return this.isOpen = !1, "function" == typeof this.options.onClose && this.options.onClose.call(this), this.modal.close(), this
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(O.__proto__ || Object.getPrototypeOf(O), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "_isDate",
                    value: function (e) {
                        return /Date/.test(Object.prototype.toString.call(e)) && !isNaN(e.getTime())
                    }
                }, {
                    key: "_isWeekend",
                    value: function (e) {
                        var t = e.getDay();
                        return 0 === t || 6 === t
                    }
                }, {
                    key: "_setToStartOfDay",
                    value: function (e) {
                        O._isDate(e) && e.setHours(0, 0, 0, 0)
                    }
                }, {
                    key: "_getDaysInMonth",
                    value: function (e, t) {
                        return [31, O._isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
                    }
                }, {
                    key: "_isLeapYear",
                    value: function (e) {
                        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
                    }
                }, {
                    key: "_compareDates",
                    value: function (e, t) {
                        return e.getTime() === t.getTime()
                    }
                }, {
                    key: "_setToStartOfDay",
                    value: function (e) {
                        O._isDate(e) && e.setHours(0, 0, 0, 0)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Datepicker
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), O
            }();
        t._template = ['<div class= "modal datepicker-modal">', '<div class="modal-content datepicker-container">', '<div class="datepicker-date-display">', '<span class="year-text"></span>', '<span class="date-text"></span>', "</div>", '<div class="datepicker-calendar-container">', '<div class="datepicker-calendar"></div>', '<div class="datepicker-footer">', '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>', '<div class="confirmation-btns">', '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>', '<button class="btn-flat datepicker-done waves-effect" type="button"></button>', "</div>", "</div>", "</div>", "</div>", "</div>"].join(""), M.Datepicker = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "datepicker", "M_Datepicker")
    }(cash),
    function (u) {
        "use strict";
        var e = {
            dialRadius: 135,
            outerRadius: 105,
            innerRadius: 70,
            tickRadius: 20,
            duration: 350,
            container: null,
            defaultTime: "now",
            fromNow: 0,
            showClearBtn: !1,
            i18n: {
                cancel: "Cancel",
                clear: "Clear",
                done: "Ok"
            },
            autoClose: !1,
            twelveHour: !0,
            vibrate: !0,
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            onSelect: null
        },
            t = function () {
                function m(e, t) {
                    _classCallCheck(this, m);
                    var n = _possibleConstructorReturn(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, m, e, t));
                    return (n.el.M_Timepicker = n).options = u.extend({}, m.defaults, t), n.id = M.guid(), n._insertHTMLIntoDOM(), n._setupModal(), n._setupVariables(), n._setupEventHandlers(), n._clockSetup(), n._pickerSetup(), n
                }
                return _inherits(m, Component), _createClass(m, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.modal.destroy(), u(this.modalEl).remove(), this.el.M_Timepicker = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), this._handleClockClickStartBound = this._handleClockClickStart.bind(this), this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this), this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this), this.el.addEventListener("click", this._handleInputClickBound), this.el.addEventListener("keydown", this._handleInputKeydownBound), this.plate.addEventListener("mousedown", this._handleClockClickStartBound), this.plate.addEventListener("touchstart", this._handleClockClickStartBound), u(this.spanHours).on("click", this.showView.bind(this, "hours")), u(this.spanMinutes).on("click", this.showView.bind(this, "minutes"))
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("click", this._handleInputClickBound), this.el.removeEventListener("keydown", this._handleInputKeydownBound)
                    }
                }, {
                    key: "_handleInputClick",
                    value: function () {
                        this.open()
                    }
                }, {
                    key: "_handleInputKeydown",
                    value: function (e) {
                        e.which === M.keys.ENTER && (e.preventDefault(), this.open())
                    }
                }, {
                    key: "_handleClockClickStart",
                    value: function (e) {
                        e.preventDefault();
                        var t = this.plate.getBoundingClientRect(),
                            n = {
                                x: t.left,
                                y: t.top
                            };
                        this.x0 = n.x + this.options.dialRadius, this.y0 = n.y + this.options.dialRadius, this.moved = !1;
                        var i = m._Pos(e);
                        this.dx = i.x - this.x0, this.dy = i.y - this.y0, this.setHand(this.dx, this.dy, !1), document.addEventListener("mousemove", this._handleDocumentClickMoveBound), document.addEventListener("touchmove", this._handleDocumentClickMoveBound), document.addEventListener("mouseup", this._handleDocumentClickEndBound), document.addEventListener("touchend", this._handleDocumentClickEndBound)
                    }
                }, {
                    key: "_handleDocumentClickMove",
                    value: function (e) {
                        e.preventDefault();
                        var t = m._Pos(e),
                            n = t.x - this.x0,
                            i = t.y - this.y0;
                        this.moved = !0, this.setHand(n, i, !1, !0)
                    }
                }, {
                    key: "_handleDocumentClickEnd",
                    value: function (e) {
                        var t = this;
                        e.preventDefault(), document.removeEventListener("mouseup", this._handleDocumentClickEndBound), document.removeEventListener("touchend", this._handleDocumentClickEndBound);
                        var n = m._Pos(e),
                            i = n.x - this.x0,
                            o = n.y - this.y0;
                        this.moved && i === this.dx && o === this.dy && this.setHand(i, o), "hours" === this.currentView ? this.showView("minutes", this.options.duration / 2) : this.options.autoClose && (u(this.minutesView).addClass("timepicker-dial-out"), setTimeout(function () {
                            t.done()
                        }, this.options.duration / 2)), "function" == typeof this.options.onSelect && this.options.onSelect.call(this, this.hours, this.minutes), document.removeEventListener("mousemove", this._handleDocumentClickMoveBound), document.removeEventListener("touchmove", this._handleDocumentClickMoveBound)
                    }
                }, {
                    key: "_insertHTMLIntoDOM",
                    value: function () {
                        this.$modalEl = u(m._template), this.modalEl = this.$modalEl[0], this.modalEl.id = "modal-" + this.id;
                        var e = document.querySelector(this.options.container);
                        this.options.container && e ? this.$modalEl.appendTo(e) : this.$modalEl.insertBefore(this.el)
                    }
                }, {
                    key: "_setupModal",
                    value: function () {
                        var e = this;
                        this.modal = M.Modal.init(this.modalEl, {
                            onOpenStart: this.options.onOpenStart,
                            onOpenEnd: this.options.onOpenEnd,
                            onCloseStart: this.options.onCloseStart,
                            onCloseEnd: function () {
                                "function" == typeof e.options.onCloseEnd && e.options.onCloseEnd.call(e), e.isOpen = !1
                            }
                        })
                    }
                }, {
                    key: "_setupVariables",
                    value: function () {
                        this.currentView = "hours", this.vibrate = navigator.vibrate ? "vibrate" : navigator.webkitVibrate ? "webkitVibrate" : null, this._canvas = this.modalEl.querySelector(".timepicker-canvas"), this.plate = this.modalEl.querySelector(".timepicker-plate"), this.hoursView = this.modalEl.querySelector(".timepicker-hours"), this.minutesView = this.modalEl.querySelector(".timepicker-minutes"), this.spanHours = this.modalEl.querySelector(".timepicker-span-hours"), this.spanMinutes = this.modalEl.querySelector(".timepicker-span-minutes"), this.spanAmPm = this.modalEl.querySelector(".timepicker-span-am-pm"), this.footer = this.modalEl.querySelector(".timepicker-footer"), this.amOrPm = "PM"
                    }
                }, {
                    key: "_pickerSetup",
                    value: function () {
                        var e = u('<button class="btn-flat timepicker-clear waves-effect" style="visibility: hidden;" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.clear + "</button>").appendTo(this.footer).on("click", this.clear.bind(this));
                        this.options.showClearBtn && e.css({
                            visibility: ""
                        });
                        var t = u('<div class="confirmation-btns"></div>');
                        u('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.cancel + "</button>").appendTo(t).on("click", this.close.bind(this)), u('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.done + "</button>").appendTo(t).on("click", this.done.bind(this)), t.appendTo(this.footer)
                    }
                }, {
                    key: "_clockSetup",
                    value: function () {
                        this.options.twelveHour && (this.$amBtn = u('<div class="am-btn">AM</div>'), this.$pmBtn = u('<div class="pm-btn">PM</div>'), this.$amBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm), this.$pmBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm)), this._buildHoursView(), this._buildMinutesView(), this._buildSVGClock()
                    }
                }, {
                    key: "_buildSVGClock",
                    value: function () {
                        var e = this.options.dialRadius,
                            t = this.options.tickRadius,
                            n = 2 * e,
                            i = m._createSVGEl("svg");
                        i.setAttribute("class", "timepicker-svg"), i.setAttribute("width", n), i.setAttribute("height", n);
                        var o = m._createSVGEl("g");
                        o.setAttribute("transform", "translate(" + e + "," + e + ")");
                        var a = m._createSVGEl("circle");
                        a.setAttribute("class", "timepicker-canvas-bearing"), a.setAttribute("cx", 0), a.setAttribute("cy", 0), a.setAttribute("r", 4);
                        var s = m._createSVGEl("line");
                        s.setAttribute("x1", 0), s.setAttribute("y1", 0);
                        var r = m._createSVGEl("circle");
                        r.setAttribute("class", "timepicker-canvas-bg"), r.setAttribute("r", t), o.appendChild(s), o.appendChild(r), o.appendChild(a), i.appendChild(o), this._canvas.appendChild(i), this.hand = s, this.bg = r, this.bearing = a, this.g = o
                    }
                }, {
                    key: "_buildHoursView",
                    value: function () {
                        var e = u('<div class="timepicker-tick"></div>');
                        if (this.options.twelveHour)
                            for (var t = 1; t < 13; t += 1) {
                                var n = e.clone(),
                                    i = t / 6 * Math.PI,
                                    o = this.options.outerRadius;
                                n.css({
                                    left: this.options.dialRadius + Math.sin(i) * o - this.options.tickRadius + "px",
                                    top: this.options.dialRadius - Math.cos(i) * o - this.options.tickRadius + "px"
                                }), n.html(0 === t ? "00" : t), this.hoursView.appendChild(n[0])
                            } else
                            for (var a = 0; a < 24; a += 1) {
                                var s = e.clone(),
                                    r = a / 6 * Math.PI,
                                    l = 0 < a && a < 13 ? this.options.innerRadius : this.options.outerRadius;
                                s.css({
                                    left: this.options.dialRadius + Math.sin(r) * l - this.options.tickRadius + "px",
                                    top: this.options.dialRadius - Math.cos(r) * l - this.options.tickRadius + "px"
                                }), s.html(0 === a ? "00" : a), this.hoursView.appendChild(s[0])
                            }
                    }
                }, {
                    key: "_buildMinutesView",
                    value: function () {
                        for (var e = u('<div class="timepicker-tick"></div>'), t = 0; t < 60; t += 5) {
                            var n = e.clone(),
                                i = t / 30 * Math.PI;
                            n.css({
                                left: this.options.dialRadius + Math.sin(i) * this.options.outerRadius - this.options.tickRadius + "px",
                                top: this.options.dialRadius - Math.cos(i) * this.options.outerRadius - this.options.tickRadius + "px"
                            }), n.html(m._addLeadingZero(t)), this.minutesView.appendChild(n[0])
                        }
                    }
                }, {
                    key: "_handleAmPmClick",
                    value: function (e) {
                        var t = u(e.target);
                        this.amOrPm = t.hasClass("am-btn") ? "AM" : "PM", this._updateAmPmView()
                    }
                }, {
                    key: "_updateAmPmView",
                    value: function () {
                        this.options.twelveHour && (this.$amBtn.toggleClass("text-primary", "AM" === this.amOrPm), this.$pmBtn.toggleClass("text-primary", "PM" === this.amOrPm))
                    }
                }, {
                    key: "_updateTimeFromInput",
                    value: function () {
                        var e = ((this.el.value || this.options.defaultTime || "") + "").split(":");
                        if (this.options.twelveHour && "undefined" != typeof e[1] && (0 < e[1].toUpperCase().indexOf("AM") ? this.amOrPm = "AM" : this.amOrPm = "PM", e[1] = e[1].replace("AM", "").replace("PM", "")), "now" === e[0]) {
                            var t = new Date(+new Date + this.options.fromNow);
                            e = [t.getHours(), t.getMinutes()], this.options.twelveHour && (this.amOrPm = 12 <= e[0] && e[0] < 24 ? "PM" : "AM")
                        }
                        this.hours = +e[0] || 0, this.minutes = +e[1] || 0, this.spanHours.innerHTML = this.hours, this.spanMinutes.innerHTML = m._addLeadingZero(this.minutes), this._updateAmPmView()
                    }
                }, {
                    key: "showView",
                    value: function (e, t) {
                        "minutes" === e && u(this.hoursView).css("visibility");
                        var n = "hours" === e,
                            i = n ? this.hoursView : this.minutesView,
                            o = n ? this.minutesView : this.hoursView;
                        this.currentView = e, u(this.spanHours).toggleClass("text-primary", n), u(this.spanMinutes).toggleClass("text-primary", !n), o.classList.add("timepicker-dial-out"), u(i).css("visibility", "visible").removeClass("timepicker-dial-out"), this.resetClock(t), clearTimeout(this.toggleViewTimer), this.toggleViewTimer = setTimeout(function () {
                            u(o).css("visibility", "hidden")
                        }, this.options.duration)
                    }
                }, {
                    key: "resetClock",
                    value: function (e) {
                        var t = this.currentView,
                            n = this[t],
                            i = "hours" === t,
                            o = n * (Math.PI / (i ? 6 : 30)),
                            a = i && 0 < n && n < 13 ? this.options.innerRadius : this.options.outerRadius,
                            s = Math.sin(o) * a,
                            r = -Math.cos(o) * a,
                            l = this;
                        e ? (u(this.canvas).addClass("timepicker-canvas-out"), setTimeout(function () {
                            u(l.canvas).removeClass("timepicker-canvas-out"), l.setHand(s, r)
                        }, e)) : this.setHand(s, r)
                    }
                }, {
                    key: "setHand",
                    value: function (e, t, n) {
                        var i = this,
                            o = Math.atan2(e, -t),
                            a = "hours" === this.currentView,
                            s = Math.PI / (a || n ? 6 : 30),
                            r = Math.sqrt(e * e + t * t),
                            l = a && r < (this.options.outerRadius + this.options.innerRadius) / 2,
                            u = l ? this.options.innerRadius : this.options.outerRadius;
                        this.options.twelveHour && (u = this.options.outerRadius), o < 0 && (o = 2 * Math.PI + o);
                        var d = Math.round(o / s);
                        o = d * s, this.options.twelveHour ? a ? 0 === d && (d = 12) : (n && (d *= 5), 60 === d && (d = 0)) : a ? (12 === d && (d = 0), d = l ? 0 === d ? 12 : d : 0 === d ? 0 : d + 12) : (n && (d *= 5), 60 === d && (d = 0)), this[this.currentView] !== d && this.vibrate && this.options.vibrate && (this.vibrateTimer || (navigator[this.vibrate](10), this.vibrateTimer = setTimeout(function () {
                            i.vibrateTimer = null
                        }, 100))), this[this.currentView] = d, a ? this.spanHours.innerHTML = d : this.spanMinutes.innerHTML = m._addLeadingZero(d);
                        var c = Math.sin(o) * (u - this.options.tickRadius),
                            h = -Math.cos(o) * (u - this.options.tickRadius),
                            p = Math.sin(o) * u,
                            f = -Math.cos(o) * u;
                        this.hand.setAttribute("x2", c), this.hand.setAttribute("y2", h), this.bg.setAttribute("cx", p), this.bg.setAttribute("cy", f)
                    }
                }, {
                    key: "open",
                    value: function () {
                        this.isOpen || (this.isOpen = !0, this._updateTimeFromInput(), this.showView("hours"), this.modal.open())
                    }
                }, {
                    key: "close",
                    value: function () {
                        this.isOpen && (this.isOpen = !1, this.modal.close())
                    }
                }, {
                    key: "done",
                    value: function (e, t) {
                        var n = this.el.value,
                            i = t ? "" : m._addLeadingZero(this.hours) + ":" + m._addLeadingZero(this.minutes);
                        this.time = i, !t && this.options.twelveHour && (i = i + " " + this.amOrPm), (this.el.value = i) !== n && this.$el.trigger("change"), this.close(), this.el.focus()
                    }
                }, {
                    key: "clear",
                    value: function () {
                        this.done(null, !0)
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(m.__proto__ || Object.getPrototypeOf(m), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "_addLeadingZero",
                    value: function (e) {
                        return (e < 10 ? "0" : "") + e
                    }
                }, {
                    key: "_createSVGEl",
                    value: function (e) {
                        var t = "http://www.w3.org/2000/svg";
                        return document.createElementNS(t, e)
                    }
                }, {
                    key: "_Pos",
                    value: function (e) {
                        return e.targetTouches && 1 <= e.targetTouches.length ? {
                            x: e.targetTouches[0].clientX,
                            y: e.targetTouches[0].clientY
                        } : {
                                x: e.clientX,
                                y: e.clientY
                            }
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Timepicker
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), m
            }();
        t._template = ['<div class= "modal timepicker-modal">', '<div class="modal-content timepicker-container">', '<div class="timepicker-digital-display">', '<div class="timepicker-text-container">', '<div class="timepicker-display-column">', '<span class="timepicker-span-hours text-primary"></span>', ":", '<span class="timepicker-span-minutes"></span>', "</div>", '<div class="timepicker-display-column timepicker-display-am-pm">', '<div class="timepicker-span-am-pm"></div>', "</div>", "</div>", "</div>", '<div class="timepicker-analog-display">', '<div class="timepicker-plate">', '<div class="timepicker-canvas"></div>', '<div class="timepicker-dial timepicker-hours"></div>', '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>', "</div>", '<div class="timepicker-footer"></div>', "</div>", "</div>", "</div>"].join(""), M.Timepicker = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "timepicker", "M_Timepicker")
    }(cash),
    function (o) {
        "use strict";
        var e = {},
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_CharacterCounter = n).options = o.extend({}, i.defaults, t), n.isInvalid = !1, n.isValidLength = !1, n._setupCounter(), n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.el.CharacterCounter = undefined, this._removeCounter()
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleUpdateCounterBound = this.updateCounter.bind(this), this.el.addEventListener("focus", this._handleUpdateCounterBound, !0), this.el.addEventListener("input", this._handleUpdateCounterBound, !0)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("focus", this._handleUpdateCounterBound, !0), this.el.removeEventListener("input", this._handleUpdateCounterBound, !0)
                    }
                }, {
                    key: "_setupCounter",
                    value: function () {
                        this.counterEl = document.createElement("span"), o(this.counterEl).addClass("character-counter").css({
                            "float": "right",
                            "font-size": "12px",
                            height: 1
                        }), this.$el.parent().append(this.counterEl)
                    }
                }, {
                    key: "_removeCounter",
                    value: function () {
                        o(this.counterEl).remove()
                    }
                }, {
                    key: "updateCounter",
                    value: function () {
                        var e = +this.$el.attr("data-length"),
                            t = this.el.value.length;
                        this.isValidLength = t <= e;
                        var n = t;
                        e && (n += "/" + e, this._validateInput()), o(this.counterEl).html(n)
                    }
                }, {
                    key: "_validateInput",
                    value: function () {
                        this.isValidLength && this.isInvalid ? (this.isInvalid = !1, this.$el.removeClass("invalid")) : this.isValidLength || this.isInvalid || (this.isInvalid = !0, this.$el.removeClass("valid"), this.$el.addClass("invalid"))
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_CharacterCounter
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        M.CharacterCounter = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "characterCounter", "M_CharacterCounter")
    }(cash),
    function (w) {
        "use strict";
        var e = {
            duration: 200,
            dist: -100,
            shift: 0,
            padding: 0,
            numVisible: 5,
            fullWidth: !1,
            indicators: !1,
            noWrap: !1,
            onCycleTo: null
        },
            t = function () {
                function n(e, t) {
                    _classCallCheck(this, n);
                    var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, e, t));
                    return (i.el.M_Carousel = i).options = w.extend({}, n.defaults, t), i.hasMultipleSlides = 1 < i.$el.find(".carousel-item").length, i.showIndicators = i.options.indicators && i.hasMultipleSlides, i.noWrap = i.options.noWrap || !i.hasMultipleSlides, i.pressed = !1, i.dragged = !1, i.offset = i.target = 0, i.images = [], i.itemWidth = i.$el.find(".carousel-item").first().innerWidth(), i.itemHeight = i.$el.find(".carousel-item").first().innerHeight(), i.dim = 2 * i.itemWidth + i.options.padding || 1, i._autoScrollBound = i._autoScroll.bind(i), i._trackBound = i._track.bind(i), i.options.fullWidth && (i.options.dist = 0, i._setCarouselHeight(), i.showIndicators && i.$el.find(".carousel-fixed-item").addClass("with-indicators")), i.$indicators = w('<ul class="indicators"></ul>'), i.$el.find(".carousel-item").each(function (e, t) {
                        if (i.images.push(e), i.showIndicators) {
                            var n = w('<li class="indicator-item"></li>');
                            0 === t && n[0].classList.add("active"), i.$indicators.append(n)
                        }
                    }), i.showIndicators && i.$el.append(i.$indicators), i.count = i.images.length, i.options.numVisible = Math.min(i.count, i.options.numVisible), i.xform = "transform", ["webkit", "Moz", "O", "ms"].every(function (e) {
                        var t = e + "Transform";
                        return "undefined" == typeof document.body.style[t] || (i.xform = t, !1)
                    }), i._setupEventHandlers(), i._scroll(i.offset), i
                }
                return _inherits(n, Component), _createClass(n, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.el.M_Carousel = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        var t = this;
                        this._handleCarouselTapBound = this._handleCarouselTap.bind(this), this._handleCarouselDragBound = this._handleCarouselDrag.bind(this), this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this), this._handleCarouselClickBound = this._handleCarouselClick.bind(this), "undefined" != typeof window.ontouchstart && (this.el.addEventListener("touchstart", this._handleCarouselTapBound), this.el.addEventListener("touchmove", this._handleCarouselDragBound), this.el.addEventListener("touchend", this._handleCarouselReleaseBound)), this.el.addEventListener("mousedown", this._handleCarouselTapBound), this.el.addEventListener("mousemove", this._handleCarouselDragBound), this.el.addEventListener("mouseup", this._handleCarouselReleaseBound), this.el.addEventListener("mouseleave", this._handleCarouselReleaseBound), this.el.addEventListener("click", this._handleCarouselClickBound), this.showIndicators && this.$indicators && (this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this), this.$indicators.find(".indicator-item").each(function (e) {
                            e.addEventListener("click", t._handleIndicatorClickBound)
                        }));
                        var e = M.throttle(this._handleResize, 200);
                        this._handleThrottledResizeBound = e.bind(this), window.addEventListener("resize", this._handleThrottledResizeBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        var t = this;
                        "undefined" != typeof window.ontouchstart && (this.el.removeEventListener("touchstart", this._handleCarouselTapBound), this.el.removeEventListener("touchmove", this._handleCarouselDragBound), this.el.removeEventListener("touchend", this._handleCarouselReleaseBound)), this.el.removeEventListener("mousedown", this._handleCarouselTapBound), this.el.removeEventListener("mousemove", this._handleCarouselDragBound), this.el.removeEventListener("mouseup", this._handleCarouselReleaseBound), this.el.removeEventListener("mouseleave", this._handleCarouselReleaseBound), this.el.removeEventListener("click", this._handleCarouselClickBound), this.showIndicators && this.$indicators && this.$indicators.find(".indicator-item").each(function (e) {
                            e.removeEventListener("click", t._handleIndicatorClickBound)
                        }), window.removeEventListener("resize", this._handleThrottledResizeBound)
                    }
                }, {
                    key: "_handleCarouselTap",
                    value: function (e) {
                        "mousedown" === e.type && w(e.target).is("img") && e.preventDefault(), this.pressed = !0, this.dragged = !1, this.verticalDragged = !1, this.reference = this._xpos(e), this.referenceY = this._ypos(e), this.velocity = this.amplitude = 0, this.frame = this.offset, this.timestamp = Date.now(), clearInterval(this.ticker), this.ticker = setInterval(this._trackBound, 100)
                    }
                }, {
                    key: "_handleCarouselDrag",
                    value: function (e) {
                        var t = void 0,
                            n = void 0,
                            i = void 0;
                        if (this.pressed)
                            if (t = this._xpos(e), n = this._ypos(e), i = this.reference - t, Math.abs(this.referenceY - n) < 30 && !this.verticalDragged) (2 < i || i < -2) && (this.dragged = !0, this.reference = t, this._scroll(this.offset + i));
                            else {
                                if (this.dragged) return e.preventDefault(), e.stopPropagation(), !1;
                                this.verticalDragged = !0
                            }
                        if (this.dragged) return e.preventDefault(), e.stopPropagation(), !1
                    }
                }, {
                    key: "_handleCarouselRelease",
                    value: function (e) {
                        if (this.pressed) return this.pressed = !1, clearInterval(this.ticker), this.target = this.offset, (10 < this.velocity || this.velocity < -10) && (this.amplitude = .9 * this.velocity, this.target = this.offset + this.amplitude), this.target = Math.round(this.target / this.dim) * this.dim, this.noWrap && (this.target >= this.dim * (this.count - 1) ? this.target = this.dim * (this.count - 1) : this.target < 0 && (this.target = 0)), this.amplitude = this.target - this.offset, this.timestamp = Date.now(), requestAnimationFrame(this._autoScrollBound), this.dragged && (e.preventDefault(), e.stopPropagation()), !1
                    }
                }, {
                    key: "_handleCarouselClick",
                    value: function (e) {
                        if (this.dragged) return e.preventDefault(), e.stopPropagation(), !1;
                        if (!this.options.fullWidth) {
                            var t = w(e.target).closest(".carousel-item").index();
                            0 !== this._wrap(this.center) - t && (e.preventDefault(), e.stopPropagation()), this._cycleTo(t)
                        }
                    }
                }, {
                    key: "_handleIndicatorClick",
                    value: function (e) {
                        e.stopPropagation();
                        var t = w(e.target).closest(".indicator-item");
                        t.length && this._cycleTo(t.index())
                    }
                }, {
                    key: "_handleResize",
                    value: function () {
                        this.options.fullWidth ? (this.itemWidth = this.$el.find(".carousel-item").first().innerWidth(), this.imageHeight = this.$el.find(".carousel-item.active").height(), this.dim = 2 * this.itemWidth + this.options.padding, this.offset = 2 * this.center * this.itemWidth, this.target = this.offset, this._setCarouselHeight(!0)) : this._scroll()
                    }
                }, {
                    key: "_setCarouselHeight",
                    value: function (e) {
                        var t = this,
                            n = this.$el.find(".carousel-item.active").length ? this.$el.find(".carousel-item.active").first() : this.$el.find(".carousel-item").first(),
                            i = n.find("img").first();
                        if (i.length)
                            if (i[0].complete) {
                                var o = i.height();
                                if (0 < o) this.$el.css("height", o + "px");
                                else {
                                    var a = i[0].naturalWidth,
                                        s = i[0].naturalHeight,
                                        r = this.$el.width() / a * s;
                                    this.$el.css("height", r + "px")
                                }
                            } else i.one("load", function (e) {
                                t.$el.css("height", e.offsetHeight + "px")
                            });
                        else if (!e) {
                            var l = n.height();
                            this.$el.css("height", l + "px")
                        }
                    }
                }, {
                    key: "_xpos",
                    value: function (e) {
                        return e.targetTouches && 1 <= e.targetTouches.length ? e.targetTouches[0].clientX : e.clientX
                    }
                }, {
                    key: "_ypos",
                    value: function (e) {
                        return e.targetTouches && 1 <= e.targetTouches.length ? e.targetTouches[0].clientY : e.clientY
                    }
                }, {
                    key: "_wrap",
                    value: function (e) {
                        return e >= this.count ? e % this.count : e < 0 ? this._wrap(this.count + e % this.count) : e
                    }
                }, {
                    key: "_track",
                    value: function () {
                        var e = void 0,
                            t = void 0,
                            n = void 0,
                            i = void 0;
                        t = (e = Date.now()) - this.timestamp, this.timestamp = e, n = this.offset - this.frame, this.frame = this.offset, i = 1e3 * n / (1 + t), this.velocity = .8 * i + .2 * this.velocity
                    }
                }, {
                    key: "_autoScroll",
                    value: function () {
                        var e = void 0,
                            t = void 0;
                        this.amplitude && (e = Date.now() - this.timestamp, 2 < (t = this.amplitude * Math.exp(-e / this.options.duration)) || t < -2 ? (this._scroll(this.target - t), requestAnimationFrame(this._autoScrollBound)) : this._scroll(this.target))
                    }
                }, {
                    key: "_scroll",
                    value: function (e) {
                        var t = this;
                        this.$el.hasClass("scrolling") || this.el.classList.add("scrolling"), null != this.scrollingTimeout && window.clearTimeout(this.scrollingTimeout), this.scrollingTimeout = window.setTimeout(function () {
                            t.$el.removeClass("scrolling")
                        }, this.options.duration);
                        var n = void 0,
                            i = void 0,
                            o = void 0,
                            a = void 0,
                            s = void 0,
                            r = void 0,
                            l = void 0,
                            u = void 0,
                            d = void 0,
                            c = void 0,
                            h = this.center,
                            p = 1 / this.options.numVisible;
                        if (this.offset = "number" == typeof e ? e : this.offset, this.center = Math.floor((this.offset + this.dim / 2) / this.dim), s = -(a = (o = this.offset - this.center * this.dim) < 0 ? 1 : -1) * o * 2 / this.dim, i = this.count >> 1, this.options.fullWidth ? (l = "translateX(0)", c = 1) : (l = "translateX(" + (this.el.clientWidth - this.itemWidth) / 2 + "px) ", l += "translateY(" + (this.el.clientHeight - this.itemHeight) / 2 + "px)", c = 1 - p * s), this.showIndicators) {
                            var f = this.center % this.count,
                                m = this.$indicators.find(".indicator-item.active");
                            m.index() !== f && (m.removeClass("active"), this.$indicators.find(".indicator-item").eq(f)[0].classList.add("active"))
                        }
                        if (!this.noWrap || 0 <= this.center && this.center < this.count) {
                            r = this.images[this._wrap(this.center)], w(r).hasClass("active") || (this.$el.find(".carousel-item").removeClass("active"), r.classList.add("active"));
                            var v = l + " translateX(" + -o / 2 + "px) translateX(" + a * this.options.shift * s * n + "px) translateZ(" + this.options.dist * s + "px)";
                            this._updateItemStyle(r, c, 0, v)
                        }
                        for (n = 1; n <= i; ++n) {
                            if (this.options.fullWidth ? (u = this.options.dist, d = n === i && o < 0 ? 1 - s : 1) : (u = this.options.dist * (2 * n + s * a), d = 1 - p * (2 * n + s * a)), !this.noWrap || this.center + n < this.count) {
                                r = this.images[this._wrap(this.center + n)];
                                var g = l + " translateX(" + (this.options.shift + (this.dim * n - o) / 2) + "px) translateZ(" + u + "px)";
                                this._updateItemStyle(r, d, -n, g)
                            }
                            if (this.options.fullWidth ? (u = this.options.dist, d = n === i && 0 < o ? 1 - s : 1) : (u = this.options.dist * (2 * n - s * a), d = 1 - p * (2 * n - s * a)), !this.noWrap || 0 <= this.center - n) {
                                r = this.images[this._wrap(this.center - n)];
                                var y = l + " translateX(" + (-this.options.shift + (-this.dim * n - o) / 2) + "px) translateZ(" + u + "px)";
                                this._updateItemStyle(r, d, -n, y)
                            }
                        }
                        if (!this.noWrap || 0 <= this.center && this.center < this.count) {
                            r = this.images[this._wrap(this.center)];
                            var b = l + " translateX(" + -o / 2 + "px) translateX(" + a * this.options.shift * s + "px) translateZ(" + this.options.dist * s + "px)";
                            this._updateItemStyle(r, c, 0, b)
                        }
                        var _ = this.$el.find(".carousel-item").eq(this._wrap(this.center));
                        h !== this.center && "function" == typeof this.options.onCycleTo && this.options.onCycleTo.call(this, _[0], this.dragged), "function" == typeof this.oneTimeCallback && (this.oneTimeCallback.call(this, _[0], this.dragged), this.oneTimeCallback = null)
                    }
                }, {
                    key: "_updateItemStyle",
                    value: function (e, t, n, i) {
                        e.style[this.xform] = i, e.style.zIndex = n, e.style.opacity = t, e.style.visibility = "visible"
                    }
                }, {
                    key: "_cycleTo",
                    value: function (e, t) {
                        var n = this.center % this.count - e;
                        this.noWrap || (n < 0 ? Math.abs(n + this.count) < Math.abs(n) && (n += this.count) : 0 < n && Math.abs(n - this.count) < n && (n -= this.count)), this.target = this.dim * Math.round(this.offset / this.dim), n < 0 ? this.target += this.dim * Math.abs(n) : 0 < n && (this.target -= this.dim * n), "function" == typeof t && (this.oneTimeCallback = t), this.offset !== this.target && (this.amplitude = this.target - this.offset, this.timestamp = Date.now(), requestAnimationFrame(this._autoScrollBound))
                    }
                }, {
                    key: "next",
                    value: function (e) {
                        (e === undefined || isNaN(e)) && (e = 1);
                        var t = this.center + e;
                        if (t >= this.count || t < 0) {
                            if (this.noWrap) return;
                            t = this._wrap(t)
                        }
                        this._cycleTo(t)
                    }
                }, {
                    key: "prev",
                    value: function (e) {
                        (e === undefined || isNaN(e)) && (e = 1);
                        var t = this.center - e;
                        if (t >= this.count || t < 0) {
                            if (this.noWrap) return;
                            t = this._wrap(t)
                        }
                        this._cycleTo(t)
                    }
                }, {
                    key: "set",
                    value: function (e, t) {
                        if ((e === undefined || isNaN(e)) && (e = 0), e > this.count || e < 0) {
                            if (this.noWrap) return;
                            e = this._wrap(e)
                        }
                        this._cycleTo(e, t)
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Carousel
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), n
            }();
        M.Carousel = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "carousel", "M_Carousel")
    }(cash),
    function (I) {
        "use strict";
        var e = {
            onOpen: undefined,
            onClose: undefined
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_TapTarget = n).options = I.extend({}, i.defaults, t), n.isOpen = !1, n.$origin = I("#" + n.$el.attr("data-target")), n._setup(), n._calculatePositioning(), n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this.el.TapTarget = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleDocumentClickBound = this._handleDocumentClick.bind(this), this._handleTargetClickBound = this._handleTargetClick.bind(this), this._handleOriginClickBound = this._handleOriginClick.bind(this), this.el.addEventListener("click", this._handleTargetClickBound), this.originEl.addEventListener("click", this._handleOriginClickBound);
                        var e = M.throttle(this._handleResize, 200);
                        this._handleThrottledResizeBound = e.bind(this), window.addEventListener("resize", this._handleThrottledResizeBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("click", this._handleTargetClickBound), this.originEl.removeEventListener("click", this._handleOriginClickBound), window.removeEventListener("resize", this._handleThrottledResizeBound)
                    }
                }, {
                    key: "_handleTargetClick",
                    value: function () {
                        this.open()
                    }
                }, {
                    key: "_handleOriginClick",
                    value: function () {
                        this.close()
                    }
                }, {
                    key: "_handleResize",
                    value: function () {
                        this._calculatePositioning()
                    }
                }, {
                    key: "_handleDocumentClick",
                    value: function (e) {
                        I(e.target).closest(".tap-target-wrapper").length || (this.close(), e.preventDefault(), e.stopPropagation())
                    }
                }, {
                    key: "_setup",
                    value: function () {
                        this.wrapper = this.$el.parent()[0], this.waveEl = I(this.wrapper).find(".tap-target-wave")[0], this.originEl = I(this.wrapper).find(".tap-target-origin")[0], this.contentEl = this.$el.find(".tap-target-content")[0], I(this.wrapper).hasClass(".tap-target-wrapper") || (this.wrapper = document.createElement("div"), this.wrapper.classList.add("tap-target-wrapper"), this.$el.before(I(this.wrapper)), this.wrapper.append(this.el)), this.contentEl || (this.contentEl = document.createElement("div"), this.contentEl.classList.add("tap-target-content"), this.$el.append(this.contentEl)), this.waveEl || (this.waveEl = document.createElement("div"), this.waveEl.classList.add("tap-target-wave"), this.originEl || (this.originEl = this.$origin.clone(!0, !0), this.originEl.addClass("tap-target-origin"), this.originEl.removeAttr("id"), this.originEl.removeAttr("style"), this.originEl = this.originEl[0], this.waveEl.append(this.originEl)), this.wrapper.append(this.waveEl))
                    }
                }, {
                    key: "_calculatePositioning",
                    value: function () {
                        var e = "fixed" === this.$origin.css("position");
                        if (!e)
                            for (var t = this.$origin.parents(), n = 0; n < t.length && !(e = "fixed" == I(t[n]).css("position")); n++);
                        var i = this.$origin.outerWidth(),
                            o = this.$origin.outerHeight(),
                            a = e ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top,
                            s = e ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left,
                            r = window.innerWidth,
                            l = window.innerHeight,
                            u = r / 2,
                            d = l / 2,
                            c = s <= u,
                            h = u < s,
                            p = a <= d,
                            f = d < a,
                            m = .25 * r <= s && s <= .75 * r,
                            v = this.$el.outerWidth(),
                            g = this.$el.outerHeight(),
                            y = a + o / 2 - g / 2,
                            b = s + i / 2 - v / 2,
                            _ = e ? "fixed" : "absolute",
                            w = m ? v : v / 2 + i,
                            x = g / 2,
                            C = p ? g / 2 : 0,
                            k = 0,
                            E = c && !m ? v / 2 - i : 0,
                            T = 0,
                            S = i,
                            L = f ? "bottom" : "top",
                            D = 2 * i,
                            O = D,
                            $ = g / 2 - O / 2,
                            A = v / 2 - D / 2,
                            B = {};
                        B.top = p ? y + "px" : "", B.right = h ? r - b - v + "px" : "", B.bottom = f ? l - y - g + "px" : "", B.left = c ? b + "px" : "", B.position = _, I(this.wrapper).css(B), I(this.contentEl).css({
                            width: w + "px",
                            height: x + "px",
                            top: C + "px",
                            right: T + "px",
                            bottom: k + "px",
                            left: E + "px",
                            padding: S + "px",
                            verticalAlign: L
                        }), I(this.waveEl).css({
                            top: $ + "px",
                            left: A + "px",
                            width: D + "px",
                            height: O + "px"
                        })
                    }
                }, {
                    key: "open",
                    value: function () {
                        this.isOpen || ("function" == typeof this.options.onOpen && this.options.onOpen.call(this, this.$origin[0]), this.isOpen = !0, this.wrapper.classList.add("open"), document.body.addEventListener("click", this._handleDocumentClickBound, !0), document.body.addEventListener("touchend", this._handleDocumentClickBound))
                    }
                }, {
                    key: "close",
                    value: function () {
                        this.isOpen && ("function" == typeof this.options.onClose && this.options.onClose.call(this, this.$origin[0]), this.isOpen = !1, this.wrapper.classList.remove("open"), document.body.removeEventListener("click", this._handleDocumentClickBound, !0), document.body.removeEventListener("touchend", this._handleDocumentClickBound))
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_TapTarget
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        M.TapTarget = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "tapTarget", "M_TapTarget")
    }(cash),
    function (d) {
        "use strict";
        var e = {
            classes: "",
            dropdownOptions: {}
        },
            t = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return n.$el.hasClass("browser-default") ? _possibleConstructorReturn(n) : ((n.el.M_FormSelect = n).options = d.extend({}, i.defaults, t), n.isMultiple = n.$el.prop("multiple"), n.el.tabIndex = -1, n._keysSelected = {}, n._valueDict = {}, n._setupDropdown(), n._setupEventHandlers(), n)
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this._removeDropdown(), this.el.M_FormSelect = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        var t = this;
                        this._handleSelectChangeBound = this._handleSelectChange.bind(this), this._handleOptionClickBound = this._handleOptionClick.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), d(this.dropdownOptions).find("li:not(.optgroup)").each(function (e) {
                            e.addEventListener("click", t._handleOptionClickBound)
                        }), this.el.addEventListener("change", this._handleSelectChangeBound), this.input.addEventListener("click", this._handleInputClickBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        var t = this;
                        d(this.dropdownOptions).find("li:not(.optgroup)").each(function (e) {
                            e.removeEventListener("click", t._handleOptionClickBound)
                        }), this.el.removeEventListener("change", this._handleSelectChangeBound), this.input.removeEventListener("click", this._handleInputClickBound)
                    }
                }, {
                    key: "_handleSelectChange",
                    value: function () {
                        this._setValueToInput()
                    }
                }, {
                    key: "_handleOptionClick",
                    value: function (e) {
                        e.preventDefault();
                        var t = d(e.target).closest("li")[0],
                            n = t.id;
                        if (!d(t).hasClass("disabled") && !d(t).hasClass("optgroup") && n.length) {
                            var i = !0;
                            if (this.isMultiple) {
                                var o = d(this.dropdownOptions).find("li.disabled.selected");
                                o.length && (o.removeClass("selected"), o.find('input[type="checkbox"]').prop("checked", !1), this._toggleEntryFromArray(o[0].id)), i = this._toggleEntryFromArray(n)
                            } else d(this.dropdownOptions).find("li").removeClass("selected"), d(t).toggleClass("selected", i);
                            d(this._valueDict[n].el).prop("selected") !== i && (d(this._valueDict[n].el).prop("selected", i), this.$el.trigger("change"))
                        }
                        e.stopPropagation()
                    }
                }, {
                    key: "_handleInputClick",
                    value: function () {
                        this.dropdown && this.dropdown.isOpen && (this._setValueToInput(), this._setSelectedStates())
                    }
                }, {
                    key: "_setupDropdown",
                    value: function () {
                        var i = this;
                        this.wrapper = document.createElement("div"), d(this.wrapper).addClass("select-wrapper " + this.options.classes), this.$el.before(d(this.wrapper)), this.wrapper.appendChild(this.el), this.el.disabled && this.wrapper.classList.add("disabled"), this.$selectOptions = this.$el.children("option, optgroup"), this.dropdownOptions = document.createElement("ul"), this.dropdownOptions.id = "select-options-" + M.guid(), d(this.dropdownOptions).addClass("dropdown-content select-dropdown " + (this.isMultiple ? "multiple-select-dropdown" : "")), this.$selectOptions.length && this.$selectOptions.each(function (e) {
                            if (d(e).is("option")) {
                                var t = void 0;
                                t = i.isMultiple ? i._appendOptionWithIcon(i.$el, e, "multiple") : i._appendOptionWithIcon(i.$el, e), i._addOptionToValueDict(e, t)
                            } else if (d(e).is("optgroup")) {
                                var n = d(e).children("option");
                                d(i.dropdownOptions).append(d('<li class="optgroup"><span>' + e.getAttribute("label") + "</span></li>")[0]), n.each(function (e) {
                                    var t = i._appendOptionWithIcon(i.$el, e, "optgroup-option");
                                    i._addOptionToValueDict(e, t)
                                })
                            }
                        }), this.$el.after(this.dropdownOptions), this.input = document.createElement("input"), d(this.input).addClass("select-dropdown dropdown-trigger"), this.input.setAttribute("type", "text"), this.input.setAttribute("readonly", "true"), this.input.setAttribute("data-target", this.dropdownOptions.id), this.el.disabled && d(this.input).prop("disabled", "true"), this.$el.before(this.input), this._setValueToInput();
                        var e = d('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
                        if (this.$el.before(e[0]), !this.el.disabled) {
                            var t = d.extend({}, this.options.dropdownOptions);
                            t.onOpenEnd = function () {
                                var e = d(i.dropdownOptions).find(".selected").first();
                                if (e.length && (M.keyDown = !0, i.dropdown.focusedIndex = e.index(), i.dropdown._focusFocusedItem(), M.keyDown = !1, i.dropdown.isScrollable)) {
                                    var t = e[0].getBoundingClientRect().top - i.dropdownOptions.getBoundingClientRect().top;
                                    t -= i.dropdownOptions.clientHeight / 2, i.dropdownOptions.scrollTop = t
                                }
                            }, this.isMultiple && (t.closeOnClick = !1), this.dropdown = M.Dropdown.init(this.input, t)
                        }
                        this._setSelectedStates()
                    }
                }, {
                    key: "_addOptionToValueDict",
                    value: function (e, t) {
                        var n = Object.keys(this._valueDict).length,
                            i = this.dropdownOptions.id + n,
                            o = {};
                        t.id = i, o.el = e, o.optionEl = t, this._valueDict[i] = o
                    }
                }, {
                    key: "_removeDropdown",
                    value: function () {
                        d(this.wrapper).find(".caret").remove(), d(this.input).remove(), d(this.dropdownOptions).remove(), d(this.wrapper).before(this.$el), d(this.wrapper).remove()
                    }
                }, {
                    key: "_appendOptionWithIcon",
                    value: function (e, t, n) {
                        var i = t.disabled ? "disabled " : "",
                            o = "optgroup-option" === n ? "optgroup-option " : "",
                            a = this.isMultiple ? '<label><input type="checkbox"' + i + '"/><span>' + t.innerHTML + "</span></label>" : t.innerHTML,
                            s = d("<li></li>"),
                            r = d("<span></span>");
                        r.html(a), s.addClass(i + " " + o), s.append(r);
                        var l = t.getAttribute("data-icon");
                        if (l) {
                            var u = d('<img alt="" src="' + l + '">');
                            s.prepend(u)
                        }
                        return d(this.dropdownOptions).append(s[0]), s[0]
                    }
                }, {
                    key: "_toggleEntryFromArray",
                    value: function (e) {
                        var t = !this._keysSelected.hasOwnProperty(e),
                            n = d(this._valueDict[e].optionEl);
                        return t ? this._keysSelected[e] = !0 : delete this._keysSelected[e], n.toggleClass("selected", t), n.find('input[type="checkbox"]').prop("checked", t), n.prop("selected", t), t
                    }
                }, {
                    key: "_setValueToInput",
                    value: function () {
                        var n = [];
                        if (this.$el.find("option").each(function (e) {
                            if (d(e).prop("selected")) {
                                var t = d(e).text();
                                n.push(t)
                            }
                        }), !n.length) {
                            var e = this.$el.find("option:disabled").eq(0);
                            e.length && "" === e[0].value && n.push(e.text())
                        }
                        this.input.value = n.join(", ")
                    }
                }, {
                    key: "_setSelectedStates",
                    value: function () {
                        for (var e in this._keysSelected = {}, this._valueDict) {
                            var t = this._valueDict[e],
                                n = d(t.el).prop("selected");
                            d(t.optionEl).find('input[type="checkbox"]').prop("checked", n), n ? (this._activateOption(d(this.dropdownOptions), d(t.optionEl)), this._keysSelected[e] = !0) : d(t.optionEl).removeClass("selected")
                        }
                    }
                }, {
                    key: "_activateOption",
                    value: function (e, t) {
                        t && (this.isMultiple || e.find("li.selected").removeClass("selected"), d(t).addClass("selected"))
                    }
                }, {
                    key: "getSelectedValues",
                    value: function () {
                        var e = [];
                        for (var t in this._keysSelected) e.push(this._valueDict[t].el.value);
                        return e
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_FormSelect
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        M.FormSelect = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "formSelect", "M_FormSelect")
    }(cash),
    function (o, t) {
        "use strict";
        var e = {},
            n = function () {
                function i(e, t) {
                    _classCallCheck(this, i);
                    var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, e, t));
                    return (n.el.M_Range = n).options = o.extend({}, i.defaults, t), n._mousedown = !1, n._setupThumb(), n._setupEventHandlers(), n
                }
                return _inherits(i, Component), _createClass(i, [{
                    key: "destroy",
                    value: function () {
                        this._removeEventHandlers(), this._removeThumb(), this.el.M_Range = undefined
                    }
                }, {
                    key: "_setupEventHandlers",
                    value: function () {
                        this._handleRangeChangeBound = this._handleRangeChange.bind(this), this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this), this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this), this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this), this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this), this.el.addEventListener("change", this._handleRangeChangeBound), this.el.addEventListener("mousedown", this._handleRangeMousedownTouchstartBound), this.el.addEventListener("touchstart", this._handleRangeMousedownTouchstartBound), this.el.addEventListener("input", this._handleRangeInputMousemoveTouchmoveBound), this.el.addEventListener("mousemove", this._handleRangeInputMousemoveTouchmoveBound), this.el.addEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound), this.el.addEventListener("mouseup", this._handleRangeMouseupTouchendBound), this.el.addEventListener("touchend", this._handleRangeMouseupTouchendBound), this.el.addEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound), this.el.addEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound), this.el.addEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound)
                    }
                }, {
                    key: "_removeEventHandlers",
                    value: function () {
                        this.el.removeEventListener("change", this._handleRangeChangeBound), this.el.removeEventListener("mousedown", this._handleRangeMousedownTouchstartBound), this.el.removeEventListener("touchstart", this._handleRangeMousedownTouchstartBound), this.el.removeEventListener("input", this._handleRangeInputMousemoveTouchmoveBound), this.el.removeEventListener("mousemove",
                            this._handleRangeInputMousemoveTouchmoveBound), this.el.removeEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound), this.el.removeEventListener("mouseup", this._handleRangeMouseupTouchendBound), this.el.removeEventListener("touchend", this._handleRangeMouseupTouchendBound), this.el.removeEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound), this.el.removeEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound), this.el.removeEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound)
                    }
                }, {
                    key: "_handleRangeChange",
                    value: function () {
                        o(this.value).html(this.$el.val()), o(this.thumb).hasClass("active") || this._showRangeBubble();
                        var e = this._calcRangeOffset();
                        o(this.thumb).addClass("active").css("left", e + "px")
                    }
                }, {
                    key: "_handleRangeMousedownTouchstart",
                    value: function (e) {
                        if (o(this.value).html(this.$el.val()), this._mousedown = !0, this.$el.addClass("active"), o(this.thumb).hasClass("active") || this._showRangeBubble(), "input" !== e.type) {
                            var t = this._calcRangeOffset();
                            o(this.thumb).addClass("active").css("left", t + "px")
                        }
                    }
                }, {
                    key: "_handleRangeInputMousemoveTouchmove",
                    value: function () {
                        if (this._mousedown) {
                            o(this.thumb).hasClass("active") || this._showRangeBubble();
                            var e = this._calcRangeOffset();
                            o(this.thumb).addClass("active").css("left", e + "px"), o(this.value).html(this.$el.val())
                        }
                    }
                }, {
                    key: "_handleRangeMouseupTouchend",
                    value: function () {
                        this._mousedown = !1, this.$el.removeClass("active")
                    }
                }, {
                    key: "_handleRangeBlurMouseoutTouchleave",
                    value: function () {
                        if (!this._mousedown) {
                            var e = 7 + parseInt(this.$el.css("padding-left")) + "px";
                            o(this.thumb).hasClass("active") && (t.remove(this.thumb), t({
                                targets: this.thumb,
                                height: 0,
                                width: 0,
                                top: 10,
                                easing: "easeOutQuad",
                                marginLeft: e,
                                duration: 100
                            })), o(this.thumb).removeClass("active")
                        }
                    }
                }, {
                    key: "_setupThumb",
                    value: function () {
                        this.thumb = document.createElement("span"), this.value = document.createElement("span"), o(this.thumb).addClass("thumb"), o(this.value).addClass("value"), o(this.thumb).append(this.value), this.$el.after(this.thumb)
                    }
                }, {
                    key: "_removeThumb",
                    value: function () {
                        o(this.thumb).remove()
                    }
                }, {
                    key: "_showRangeBubble",
                    value: function () {
                        var e = -7 + parseInt(o(this.thumb).parent().css("padding-left")) + "px";
                        t.remove(this.thumb), t({
                            targets: this.thumb,
                            height: 30,
                            width: 30,
                            top: -30,
                            marginLeft: e,
                            duration: 300,
                            easing: "easeOutQuint"
                        })
                    }
                }, {
                    key: "_calcRangeOffset",
                    value: function () {
                        var e = this.$el.width() - 15,
                            t = parseFloat(this.$el.attr("max")) || 100,
                            n = parseFloat(this.$el.attr("min")) || 0;
                        return (parseFloat(this.$el.val()) - n) / (t - n) * e
                    }
                }], [{
                    key: "init",
                    value: function (e, t) {
                        return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, e, t)
                    }
                }, {
                    key: "getInstance",
                    value: function (e) {
                        return (e.jquery ? e[0] : e).M_Range
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return e
                    }
                }]), i
            }();
        M.Range = n, M.jQueryLoaded && M.initializeJqueryWrapper(n, "range", "M_Range"), n.init(o("input[type=range]"))
    }(cash, M.anime),
    function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : t(e.jQuery)
    }(this, function (M) {
        "use strict";

        function _(e) {
            return "number" == typeof e && !isNaN(e)
        }

        function a(e) {
            return void 0 === e
        }

        function s(e, t) {
            var n = [];
            return _(t) && n.push(t), n.slice.apply(e, n)
        }

        function o(i, o) {
            for (var e = arguments.length, a = Array(2 < e ? e - 2 : 0), t = 2; t < e; t++) a[t - 2] = arguments[t];
            return function () {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return i.apply(o, a.concat(s(t)))
            }
        }

        function C(e) {
            var t = [];
            return M.each(e, function (e) {
                t.push(e)
            }), t
        }

        function l(e) {
            var t = e.match(/^(https?:)\/\/([^:\/?#]+):?(\d*)/i);
            return t && (t[1] !== location.protocol || t[2] !== location.hostname || t[3] !== location.port)
        }

        function u(e) {
            var t = "timestamp=" + (new Date).getTime();
            return e + (-1 === e.indexOf("?") ? "?" : "&") + t
        }

        function r(e, t) {
            if (!e.naturalWidth || x) {
                var n = document.createElement("img");
                n.onload = function () {
                    t(this.width, this.height)
                }, n.src = e.src
            } else t(e.naturalWidth, e.naturalHeight)
        }

        function v(e) {
            var t = [],
                n = e.translateX,
                i = e.translateY,
                o = e.rotate,
                a = e.scaleX,
                s = e.scaleY;
            return _(n) && 0 !== n && t.push("translateX(" + n + "px)"), _(i) && 0 !== i && t.push("translateY(" + i + "px)"), _(o) && 0 !== o && t.push("rotate(" + o + "deg)"), _(a) && 1 !== a && t.push("scaleX(" + a + ")"), _(s) && 1 !== s && t.push("scaleY(" + s + ")"), t.length ? t.join(" ") : "none"
        }

        function w(e, t) {
            var n = Math.abs(e.degree) % 180,
                i = (90 < n ? 180 - n : n) * Math.PI / 180,
                o = Math.sin(i),
                a = Math.cos(i),
                s = e.width,
                r = e.height,
                l = e.aspectRatio,
                u = void 0,
                d = void 0;
            return t ? d = (u = s / (a + o / l)) / l : (u = s * a + r * o, d = s * o + r * a), {
                width: u,
                height: d
            }
        }

        function S(e, t, n) {
            var i = M("<canvas>")[0],
                o = i.getContext("2d"),
                a = 0,
                s = 0,
                r = t.naturalWidth,
                l = t.naturalHeight,
                u = t.rotate,
                d = t.scaleX,
                c = t.scaleY,
                h = _(d) && _(c) && (1 !== d || 1 !== c),
                p = _(u) && 0 !== u,
                f = p || h,
                m = r * Math.abs(d || 1),
                v = l * Math.abs(c || 1),
                g = void 0,
                y = void 0,
                b = void 0;
            return h && (g = m / 2, y = v / 2), p && (g = (m = (b = w({
                width: m,
                height: v,
                degree: u
            })).width) / 2, y = (v = b.height) / 2), i.width = m, i.height = v, n.fillColor && (o.fillStyle = n.fillColor, o.fillRect(0, 0, m, v)), f && (a = -r / 2, s = -l / 2, o.save(), o.translate(g, y)), p && o.rotate(u * Math.PI / 180), h && o.scale(d, c), o.imageSmoothingEnabled = !!n.imageSmoothingEnabled, n.imageSmoothingQuality && (o.imageSmoothingQuality = n.imageSmoothingQuality), o.drawImage(e, Math.floor(a), Math.floor(s), Math.floor(r), Math.floor(l)), f && o.restore(), i
        }

        function h(e, t, n) {
            var i = "",
                o = void 0;
            for (n += o = t; o < n; o++) i += E(e.getUint8(o));
            return i
        }

        function d(e) {
            var t = new DataView(e),
                n = t.byteLength,
                i = void 0,
                o = void 0,
                a = void 0,
                s = void 0,
                r = void 0,
                l = void 0,
                u = void 0,
                d = void 0,
                c = void 0;
            if (255 === t.getUint8(0) && 216 === t.getUint8(1))
                for (d = 2; d < n;) {
                    if (255 === t.getUint8(d) && 225 === t.getUint8(d + 1)) {
                        l = d;
                        break
                    }
                    d++
                }
            if (l && (o = l + 10, "Exif" === h(t, l + 4, 4) && (((s = 18761 === (r = t.getUint16(o))) || 19789 === r) && 42 === t.getUint16(o + 2, s) && (8 <= (a = t.getUint32(o + 4, s)) && (u = o + a)))), u)
                for (n = t.getUint16(u, s), c = 0; c < n; c++)
                    if (d = u + 12 * c + 2, 274 === t.getUint16(d, s)) {
                        d += 8, i = t.getUint16(d, s), x && t.setUint16(d, 1, s);
                        break
                    }
            return i
        }

        function c(e) {
            var t = e.replace(b, ""),
                n = atob(t),
                i = n.length,
                o = new ArrayBuffer(i),
                a = new Uint8Array(o),
                s = void 0;
            for (s = 0; s < i; s++) a[s] = n.charCodeAt(s);
            return o
        }

        function p(e) {
            var t = new Uint8Array(e),
                n = t.length,
                i = "",
                o = void 0;
            for (o = 0; o < n; o++) i += E(t[o]);
            return "data:image/jpeg;base64," + btoa(i)
        }

        function f(e, t) {
            var n = e.pageX,
                i = e.pageY,
                o = {
                    endX: n,
                    endY: i
                };
            return t ? o : M.extend({
                startX: n,
                startY: i
            }, o)
        }

        function k(e) {
            var t = M.extend({}, e),
                u = [];
            return M.each(e, function (e, l) {
                delete t[e], M.each(t, function (e, t) {
                    var n = Math.abs(l.startX - t.startX),
                        i = Math.abs(l.startY - t.startY),
                        o = Math.abs(l.endX - t.endX),
                        a = Math.abs(l.endY - t.endY),
                        s = Math.sqrt(n * n + i * i),
                        r = (Math.sqrt(o * o + a * a) - s) / s;
                    u.push(r)
                })
            }), u.sort(function (e, t) {
                return Math.abs(e) < Math.abs(t)
            }), u[0]
        }

        function m(e) {
            var o = 0,
                a = 0,
                s = 0;
            return M.each(e, function (e, t) {
                var n = t.startX,
                    i = t.startY;
                o += n, a += i, s += 1
            }), {
                    pageX: o /= s,
                    pageY: a /= s
                }
        }
        M = "default" in M ? M["default"] : M;
        var g = {
            viewMode: 0,
            dragMode: "crop",
            aspectRatio: NaN,
            data: null,
            preview: "",
            responsive: !0,
            restore: !0,
            checkCrossOrigin: !0,
            checkOrientation: !0,
            modal: !0,
            guides: !0,
            center: !0,
            highlight: !0,
            background: !0,
            autoCrop: !0,
            autoCropArea: .8,
            movable: !0,
            rotatable: !0,
            scalable: !0,
            zoomable: !0,
            zoomOnTouch: !0,
            zoomOnWheel: !0,
            wheelZoomRatio: .1,
            cropBoxMovable: !0,
            cropBoxResizable: !0,
            toggleDragModeOnDblclick: !0,
            minCanvasWidth: 0,
            minCanvasHeight: 0,
            minCropBoxWidth: 0,
            minCropBoxHeight: 0,
            minContainerWidth: 200,
            minContainerHeight: 100,
            ready: null,
            cropstart: null,
            cropmove: null,
            cropend: null,
            crop: null,
            zoom: null
        },
            y = '<div class="cropper-container"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-action="e"></span><span class="cropper-line line-n" data-action="n"></span><span class="cropper-line line-w" data-action="w"></span><span class="cropper-line line-s" data-action="s"></span><span class="cropper-point point-e" data-action="e"></span><span class="cropper-point point-n" data-action="n"></span><span class="cropper-point point-w" data-action="w"></span><span class="cropper-point point-s" data-action="s"></span><span class="cropper-point point-ne" data-action="ne"></span><span class="cropper-point point-nw" data-action="nw"></span><span class="cropper-point point-sw" data-action="sw"></span><span class="cropper-point point-se" data-action="se"></span></div></div>',
            b = /^data:.*,/,
            e = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i,
            t = "undefined" != typeof window ? window.navigator : null,
            x = t && e.test(t.userAgent),
            E = String.fromCharCode,
            n = {
                render: function () {
                    var e = this;
                    e.initContainer(), e.initCanvas(), e.initCropBox(), e.renderCanvas(), e.cropped && e.renderCropBox()
                },
                initContainer: function () {
                    var e = this,
                        t = e.options,
                        n = e.$element,
                        i = e.$container,
                        o = e.$cropper,
                        a = "cropper-hidden";
                    o.addClass(a), n.removeClass(a), o.css(e.container = {
                        width: Math.max(i.width(), Number(t.minContainerWidth) || 200),
                        height: Math.max(i.height(), Number(t.minContainerHeight) || 100)
                    }), n.addClass(a), o.removeClass(a)
                },
                initCanvas: function () {
                    var e = this,
                        t = e.options.viewMode,
                        n = e.container,
                        i = n.width,
                        o = n.height,
                        a = e.image,
                        s = a.naturalWidth,
                        r = a.naturalHeight,
                        l = Math.abs(a.rotate) % 180 == 90,
                        u = l ? r : s,
                        d = l ? s : r,
                        c = u / d,
                        h = i,
                        p = o;
                    i < o * c ? 3 === t ? h = o * c : p = i / c : 3 === t ? p = i / c : h = o * c;
                    var f = {
                        naturalWidth: u,
                        naturalHeight: d,
                        aspectRatio: c,
                        width: h,
                        height: p
                    };
                    f.oldLeft = f.left = (i - h) / 2, f.oldTop = f.top = (o - p) / 2, e.canvas = f, e.limited = 1 === t || 2 === t, e.limitCanvas(!0, !0), e.initialImage = M.extend({}, a), e.initialCanvas = M.extend({}, f)
                },
                limitCanvas: function (e, t) {
                    var n = this,
                        i = n.options,
                        o = i.viewMode,
                        a = n.container,
                        s = a.width,
                        r = a.height,
                        l = n.canvas,
                        u = l.aspectRatio,
                        d = n.cropBox,
                        c = n.cropped && d;
                    if (e) {
                        var h = Number(i.minCanvasWidth) || 0,
                            p = Number(i.minCanvasHeight) || 0;
                        o && (1 < o ? (h = Math.max(h, s), p = Math.max(p, r), 3 === o && (h < p * u ? h = p * u : p = h / u)) : h ? h = Math.max(h, c ? d.width : 0) : p ? p = Math.max(p, c ? d.height : 0) : c && ((h = d.width) < (p = d.height) * u ? h = p * u : p = h / u)), h && p ? h < p * u ? p = h / u : h = p * u : h ? p = h / u : p && (h = p * u), l.minWidth = h, l.minHeight = p, l.maxWidth = 1 / 0, l.maxHeight = 1 / 0
                    }
                    if (t)
                        if (o) {
                            var f = s - l.width,
                                m = r - l.height;
                            l.minLeft = Math.min(0, f), l.minTop = Math.min(0, m), l.maxLeft = Math.max(0, f), l.maxTop = Math.max(0, m), c && n.limited && (l.minLeft = Math.min(d.left, d.left + d.width - l.width), l.minTop = Math.min(d.top, d.top + d.height - l.height), l.maxLeft = d.left, l.maxTop = d.top, 2 === o && (l.width >= s && (l.minLeft = Math.min(0, f), l.maxLeft = Math.max(0, f)), l.height >= r && (l.minTop = Math.min(0, m), l.maxTop = Math.max(0, m))))
                        } else l.minLeft = -l.width, l.minTop = -l.height, l.maxLeft = s, l.maxTop = r
                },
                renderCanvas: function (e) {
                    var t = this,
                        n = t.canvas,
                        i = t.image,
                        o = i.rotate,
                        a = i.naturalWidth,
                        s = i.naturalHeight;
                    if (t.rotated) {
                        t.rotated = !1;
                        var r = w({
                            width: i.width,
                            height: i.height,
                            degree: o
                        }),
                            l = r.width / r.height,
                            u = 1 === i.aspectRatio;
                        if (u || l !== n.aspectRatio) {
                            if (n.left -= (r.width - n.width) / 2, n.top -= (r.height - n.height) / 2, n.width = r.width, n.height = r.height, n.aspectRatio = l, n.naturalWidth = a, n.naturalHeight = s, u && o % 90 || o % 180) {
                                var d = w({
                                    width: a,
                                    height: s,
                                    degree: o
                                });
                                n.naturalWidth = d.width, n.naturalHeight = d.height
                            }
                            t.limitCanvas(!0, !1)
                        }
                    } (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), t.limitCanvas(!1, !0), n.oldLeft = n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.oldTop = n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), t.$canvas.css({
                        width: n.width,
                        height: n.height,
                        transform: v({
                            translateX: n.left,
                            translateY: n.top
                        })
                    }), t.renderImage(), t.cropped && t.limited && t.limitCropBox(!0, !0), e && t.output()
                },
                renderImage: function (e) {
                    var t = this,
                        n = t.canvas,
                        i = t.image,
                        o = void 0;
                    i.rotate && (o = w({
                        width: n.width,
                        height: n.height,
                        degree: i.rotate,
                        aspectRatio: i.aspectRatio
                    }, !0)), M.extend(i, o ? {
                        width: o.width,
                        height: o.height,
                        left: (n.width - o.width) / 2,
                        top: (n.height - o.height) / 2
                    } : {
                            width: n.width,
                            height: n.height,
                            left: 0,
                            top: 0
                        }), t.$clone.css({
                            width: i.width,
                            height: i.height,
                            transform: v(M.extend({
                                translateX: i.left,
                                translateY: i.top
                            }, i))
                        }), e && t.output()
                },
                initCropBox: function () {
                    var e = this,
                        t = e.options,
                        n = e.canvas,
                        i = t.aspectRatio,
                        o = Number(t.autoCropArea) || .8,
                        a = {
                            width: n.width,
                            height: n.height
                        };
                    i && (n.height * i > n.width ? a.height = a.width / i : a.width = a.height * i), e.cropBox = a, e.limitCropBox(!0, !0), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), a.width = Math.max(a.minWidth, a.width * o), a.height = Math.max(a.minHeight, a.height * o), a.oldLeft = a.left = n.left + (n.width - a.width) / 2, a.oldTop = a.top = n.top + (n.height - a.height) / 2, e.initialCropBox = M.extend({}, a)
                },
                limitCropBox: function (e, t) {
                    var n = this,
                        i = n.options,
                        o = i.aspectRatio,
                        a = n.container,
                        s = a.width,
                        r = a.height,
                        l = n.canvas,
                        u = n.cropBox,
                        d = n.limited;
                    if (e) {
                        var c = Number(i.minCropBoxWidth) || 0,
                            h = Number(i.minCropBoxHeight) || 0,
                            p = Math.min(s, d ? l.width : s),
                            f = Math.min(r, d ? l.height : r);
                        c = Math.min(c, s), h = Math.min(h, r), o && (c && h ? c < h * o ? h = c / o : c = h * o : c ? h = c / o : h && (c = h * o), p < f * o ? f = p / o : p = f * o), u.minWidth = Math.min(c, p), u.minHeight = Math.min(h, f), u.maxWidth = p, u.maxHeight = f
                    }
                    t && (d ? (u.minLeft = Math.max(0, l.left), u.minTop = Math.max(0, l.top), u.maxLeft = Math.min(s, l.left + l.width) - u.width, u.maxTop = Math.min(r, l.top + l.height) - u.height) : (u.minLeft = 0, u.minTop = 0, u.maxLeft = s - u.width, u.maxTop = r - u.height))
                },
                renderCropBox: function () {
                    var e = this,
                        t = e.options,
                        n = e.container,
                        i = n.width,
                        o = n.height,
                        a = e.cropBox;
                    (a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft), (a.height > a.maxHeight || a.height < a.minHeight) && (a.top = a.oldTop), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), e.limitCropBox(!1, !0), a.oldLeft = a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft), a.oldTop = a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop), t.movable && t.cropBoxMovable && e.$face.data("action", a.width === i && a.height === o ? "move" : "all"), e.$cropBox.css({
                        width: a.width,
                        height: a.height,
                        transform: v({
                            translateX: a.left,
                            translateY: a.top
                        })
                    }), e.cropped && e.limited && e.limitCanvas(!0, !0), e.disabled || e.output()
                },
                output: function () {
                    var e = this;
                    e.preview(), e.completed && e.trigger("crop", e.getData())
                }
            },
            T = "preview",
            i = {
                initPreview: function () {
                    var e = this,
                        o = e.crossOrigin,
                        a = o ? e.crossOriginUrl : e.url,
                        t = document.createElement("img");
                    o && (t.crossOrigin = o), t.src = a;
                    var n = M(t);
                    e.$preview = M(e.options.preview), e.$clone2 = n, e.$viewBox.html(n), e.$preview.each(function (e, t) {
                        var n = M(t),
                            i = document.createElement("img");
                        n.data(T, {
                            width: n.width(),
                            height: n.height(),
                            html: n.html()
                        }), o && (i.crossOrigin = o), i.src = a, i.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', n.html(i)
                    })
                },
                resetPreview: function () {
                    this.$preview.each(function (e, t) {
                        var n = M(t),
                            i = n.data(T);
                        n.css({
                            width: i.width,
                            height: i.height
                        }).html(i.html).removeData(T)
                    })
                },
                preview: function () {
                    var e = this,
                        u = e.image,
                        t = e.canvas,
                        n = e.cropBox,
                        d = n.width,
                        c = n.height,
                        h = u.width,
                        p = u.height,
                        f = n.left - t.left - u.left,
                        m = n.top - t.top - u.top;
                    e.cropped && !e.disabled && (e.$clone2.css({
                        width: h,
                        height: p,
                        transform: v(M.extend({
                            translateX: -f,
                            translateY: -m
                        }, u))
                    }), e.$preview.each(function (e, t) {
                        var n = M(t),
                            i = n.data(T),
                            o = i.width,
                            a = i.height,
                            s = o,
                            r = a,
                            l = 1;
                        d && (r = c * (l = o / d)), c && a < r && (s = d * (l = a / c), r = a), n.css({
                            width: s,
                            height: r
                        }).find("img").css({
                            width: h * l,
                            height: p * l,
                            transform: v(M.extend({
                                translateX: -f * l,
                                translateY: -m * l
                            }, u))
                        })
                    }))
                }
            },
            L = "undefined" != typeof window ? window.PointerEvent : null,
            D = L ? "pointerdown" : "touchstart mousedown",
            O = L ? "pointermove" : "touchmove mousemove",
            $ = L ? " pointerup pointercancel" : "touchend touchcancel mouseup",
            A = "wheel mousewheel DOMMouseScroll",
            B = "dblclick",
            I = "resize",
            R = "cropstart",
            P = "cropmove",
            N = "cropend",
            H = "crop",
            F = "zoom",
            j = {
                bind: function () {
                    var e = this,
                        t = e.options,
                        n = e.$element,
                        i = e.$cropper;
                    M.isFunction(t.cropstart) && n.on(R, t.cropstart), M.isFunction(t.cropmove) && n.on(P, t.cropmove), M.isFunction(t.cropend) && n.on(N, t.cropend), M.isFunction(t.crop) && n.on(H, t.crop), M.isFunction(t.zoom) && n.on(F, t.zoom), i.on(D, o(e.cropStart, this)), t.zoomable && t.zoomOnWheel && i.on(A, o(e.wheel, this)), t.toggleDragModeOnDblclick && i.on(B, o(e.dblclick, this)), M(document).on(O, e.onCropMove = o(e.cropMove, this)).on($, e.onCropEnd = o(e.cropEnd, this)), t.responsive && M(window).on(I, e.onResize = o(e.resize, this))
                },
                unbind: function () {
                    var e = this,
                        t = e.options,
                        n = e.$element,
                        i = e.$cropper;
                    M.isFunction(t.cropstart) && n.off(R, t.cropstart), M.isFunction(t.cropmove) && n.off(P, t.cropmove), M.isFunction(t.cropend) && n.off(N, t.cropend), M.isFunction(t.crop) && n.off(H, t.crop), M.isFunction(t.zoom) && n.off(F, t.zoom), i.off(D, e.cropStart), t.zoomable && t.zoomOnWheel && i.off(A, e.wheel), t.toggleDragModeOnDblclick && i.off(B, e.dblclick), M(document).off(O, e.onCropMove).off($, e.onCropEnd), t.responsive && M(window).off(I, e.onResize)
                }
            },
            W = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/,
            q = {
                resize: function () {
                    var n, i, e = this,
                        t = e.options,
                        o = e.$container,
                        a = e.container,
                        s = Number(t.minContainerWidth) || 200,
                        r = Number(t.minContainerHeight) || 100;
                    if (!e.disabled && a.width !== s && a.height !== r) {
                        var l = o.width() / a.width;
                        1 === l && o.height() === a.height || (i = n = void 0, t.restore && (n = e.getCanvasData(), i = e.getCropBoxData()), e.render(), t.restore && (e.setCanvasData(M.each(n, function (e, t) {
                            n[e] = t * l
                        })), e.setCropBoxData(M.each(i, function (e, t) {
                            i[e] = t * l
                        }))))
                    }
                },
                dblclick: function () {
                    var e = this;
                    e.disabled || "none" === e.options.dragMode || e.setDragMode(e.$dragBox.hasClass("cropper-crop") ? "move" : "crop")
                },
                wheel: function (e) {
                    var t = this,
                        n = e.originalEvent || e,
                        i = Number(t.options.wheelZoomRatio) || .1;
                    if (!t.disabled && (e.preventDefault(), !t.wheeling)) {
                        t.wheeling = !0, setTimeout(function () {
                            t.wheeling = !1
                        }, 50);
                        var o = 1;
                        n.deltaY ? o = 0 < n.deltaY ? 1 : -1 : n.wheelDelta ? o = -n.wheelDelta / 120 : n.detail && (o = 0 < n.detail ? 1 : -1), t.zoom(-o * i, e)
                    }
                },
                cropStart: function (e) {
                    var t = this;
                    if (!t.disabled) {
                        var n = t.options,
                            i = t.pointers,
                            o = e.originalEvent,
                            a = void 0;
                        o && o.changedTouches ? M.each(o.changedTouches, function (e, t) {
                            i[t.identifier] = f(t)
                        }) : i[o && o.pointerId || 0] = f(o || e), a = 1 < C(i).length && n.zoomable && n.zoomOnTouch ? "zoom" : M(e.target).data("action"), W.test(a) && (t.trigger("cropstart", {
                            originalEvent: o,
                            action: a
                        }).isDefaultPrevented() || (e.preventDefault(), t.action = a, t.cropping = !1, "crop" === a && (t.cropping = !0, t.$dragBox.addClass("cropper-modal"))))
                    }
                },
                cropMove: function (e) {
                    var t = this,
                        n = t.action;
                    if (!t.disabled && n) {
                        var i = t.pointers,
                            o = e.originalEvent;
                        e.preventDefault(), t.trigger("cropmove", {
                            originalEvent: o,
                            action: n
                        }).isDefaultPrevented() || (o && o.changedTouches ? M.each(o.changedTouches, function (e, t) {
                            M.extend(i[t.identifier], f(t, !0))
                        }) : M.extend(i[o && o.pointerId || 0], f(o || e, !0)), t.change(e))
                    }
                },
                cropEnd: function (e) {
                    var t = this;
                    if (!t.disabled) {
                        var n = t.action,
                            i = t.pointers,
                            o = e.originalEvent;
                        o && o.changedTouches ? M.each(o.changedTouches, function (e, t) {
                            delete i[t.identifier]
                        }) : delete i[o && o.pointerId || 0], n && (e.preventDefault(), C(i).length || (t.action = ""), t.cropping && (t.cropping = !1, t.$dragBox.toggleClass("cropper-modal", t.cropped && t.options.modal)), t.trigger("cropend", {
                            originalEvent: o,
                            action: n
                        }))
                    }
                }
            },
            z = "e",
            X = "w",
            V = "s",
            Y = "n",
            U = "se",
            K = "sw",
            Z = "ne",
            Q = "nw",
            G = {
                change: function (e) {
                    var t = this,
                        n = t.options,
                        i = t.pointers,
                        o = i[C(i)[0]],
                        a = t.container,
                        s = t.canvas,
                        r = t.cropBox,
                        l = t.action,
                        u = n.aspectRatio,
                        d = r.width,
                        c = r.height,
                        h = r.left,
                        p = r.top,
                        f = h + d,
                        m = p + c,
                        v = 0,
                        g = 0,
                        y = a.width,
                        b = a.height,
                        _ = !0,
                        w = void 0;
                    !u && e.shiftKey && (u = d && c ? d / c : 1), t.limited && (v = r.minLeft, g = r.minTop, y = v + Math.min(a.width, s.width, s.left + s.width), b = g + Math.min(a.height, s.height, s.top + s.height));
                    var x = {
                        x: o.endX - o.startX,
                        y: o.endY - o.startY
                    };
                    switch (u && (x.X = x.y * u, x.Y = x.x / u), l) {
                        case "all":
                            h += x.x, p += x.y;
                            break;
                        case z:
                            if (0 <= x.x && (y <= f || u && (p <= g || b <= m))) {
                                _ = !1;
                                break
                            }
                            d += x.x, u && (c = d / u, p -= x.Y / 2), d < 0 && (l = X, d = 0);
                            break;
                        case Y:
                            if (x.y <= 0 && (p <= g || u && (h <= v || y <= f))) {
                                _ = !1;
                                break
                            }
                            c -= x.y, p += x.y, u && (d = c * u, h += x.X / 2), c < 0 && (l = V, c = 0);
                            break;
                        case X:
                            if (x.x <= 0 && (h <= v || u && (p <= g || b <= m))) {
                                _ = !1;
                                break
                            }
                            d -= x.x, h += x.x, u && (c = d / u, p += x.Y / 2), d < 0 && (l = z, d = 0);
                            break;
                        case V:
                            if (0 <= x.y && (b <= m || u && (h <= v || y <= f))) {
                                _ = !1;
                                break
                            }
                            c += x.y, u && (d = c * u, h -= x.X / 2), c < 0 && (l = Y, c = 0);
                            break;
                        case Z:
                            if (u) {
                                if (x.y <= 0 && (p <= g || y <= f)) {
                                    _ = !1;
                                    break
                                }
                                c -= x.y, p += x.y, d = c * u
                            } else 0 <= x.x ? f < y ? d += x.x : x.y <= 0 && p <= g && (_ = !1) : d += x.x, x.y <= 0 ? g < p && (c -= x.y, p += x.y) : (c -= x.y, p += x.y);
                            d < 0 && c < 0 ? (l = K, d = c = 0) : d < 0 ? (l = Q, d = 0) : c < 0 && (l = U, c = 0);
                            break;
                        case Q:
                            if (u) {
                                if (x.y <= 0 && (p <= g || h <= v)) {
                                    _ = !1;
                                    break
                                }
                                c -= x.y, p += x.y, d = c * u, h += x.X
                            } else x.x <= 0 ? v < h ? (d -= x.x, h += x.x) : x.y <= 0 && p <= g && (_ = !1) : (d -= x.x, h += x.x), x.y <= 0 ? g < p && (c -= x.y, p += x.y) : (c -= x.y, p += x.y);
                            d < 0 && c < 0 ? (l = U, d = c = 0) : d < 0 ? (l = Z, d = 0) : c < 0 && (l = K, c = 0);
                            break;
                        case K:
                            if (u) {
                                if (x.x <= 0 && (h <= v || b <= m)) {
                                    _ = !1;
                                    break
                                }
                                d -= x.x, h += x.x, c = d / u
                            } else x.x <= 0 ? v < h ? (d -= x.x, h += x.x) : 0 <= x.y && b <= m && (_ = !1) : (d -= x.x, h += x.x), 0 <= x.y ? m < b && (c += x.y) : c += x.y;
                            d < 0 && c < 0 ? (l = Z, d = c = 0) : d < 0 ? (l = U, d = 0) : c < 0 && (l = Q, c = 0);
                            break;
                        case U:
                            if (u) {
                                if (0 <= x.x && (y <= f || b <= m)) {
                                    _ = !1;
                                    break
                                }
                                c = (d += x.x) / u
                            } else 0 <= x.x ? f < y ? d += x.x : 0 <= x.y && b <= m && (_ = !1) : d += x.x, 0 <= x.y ? m < b && (c += x.y) : c += x.y;
                            d < 0 && c < 0 ? (l = Q, d = c = 0) : d < 0 ? (l = K, d = 0) : c < 0 && (l = Z, c = 0);
                            break;
                        case "move":
                            t.move(x.x, x.y), _ = !1;
                            break;
                        case "zoom":
                            t.zoom(k(i), e.originalEvent), _ = !1;
                            break;
                        case "crop":
                            if (!x.x || !x.y) {
                                _ = !1;
                                break
                            }
                            w = t.$cropper.offset(), h = o.startX - w.left, p = o.startY - w.top, d = r.minWidth, c = r.minHeight, 0 < x.x ? l = 0 < x.y ? U : Z : x.x < 0 && (h -= d, l = 0 < x.y ? K : Q), x.y < 0 && (p -= c), t.cropped || (t.$cropBox.removeClass("cropper-hidden"), t.cropped = !0, t.limited && t.limitCropBox(!0, !0))
                    }
                    _ && (r.width = d, r.height = c, r.left = h, r.top = p, t.action = l, t.renderCropBox()), M.each(i, function (e, t) {
                        t.startX = t.endX, t.startY = t.endY
                    })
                }
            },
            J = function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            ee = function () {
                function i(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function (e, t, n) {
                    return t && i(e.prototype, t), n && i(e, n), e
                }
            }(),
            te = function (e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            },
            ne = {
                crop: function () {
                    var e = this;
                    e.ready && !e.disabled && (e.cropped || (e.cropped = !0, e.limitCropBox(!0, !0), e.options.modal && e.$dragBox.addClass("cropper-modal"), e.$cropBox.removeClass("cropper-hidden")), e.setCropBoxData(e.initialCropBox))
                },
                reset: function () {
                    var e = this;
                    e.ready && !e.disabled && (e.image = M.extend({}, e.initialImage), e.canvas = M.extend({}, e.initialCanvas), e.cropBox = M.extend({}, e.initialCropBox), e.renderCanvas(), e.cropped && e.renderCropBox())
                },
                clear: function () {
                    var e = this;
                    e.cropped && !e.disabled && (M.extend(e.cropBox, {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0
                    }), e.cropped = !1, e.renderCropBox(), e.limitCanvas(!0, !0), e.renderCanvas(), e.$dragBox.removeClass("cropper-modal"), e.$cropBox.addClass("cropper-hidden"))
                },
                replace: function (e, t) {
                    var n = this;
                    !n.disabled && e && (n.isImg && n.$element.attr("src", e), t ? (n.url = e, n.$clone.attr("src", e), n.ready && n.$preview.find("img").add(n.$clone2).attr("src", e)) : (n.isImg && (n.replaced = !0), n.options.data = null, n.load(e)))
                },
                enable: function () {
                    var e = this;
                    e.ready && (e.disabled = !1, e.$cropper.removeClass("cropper-disabled"))
                },
                disable: function () {
                    var e = this;
                    e.ready && (e.disabled = !0, e.$cropper.addClass("cropper-disabled"))
                },
                destroy: function () {
                    var e = this,
                        t = e.$element;
                    e.loaded ? (e.isImg && e.replaced && t.attr("src", e.originalUrl), e.unbuild(), t.removeClass("cropper-hidden")) : e.isImg ? t.off("load", e.start) : e.$clone && e.$clone.remove(), t.removeData("cropper")
                },
                move: function (e, t) {
                    var n = this,
                        i = n.canvas;
                    n.moveTo(a(e) ? e : i.left + Number(e), a(t) ? t : i.top + Number(t))
                },
                moveTo: function (e, t) {
                    var n = this,
                        i = n.canvas,
                        o = !1;
                    a(t) && (t = e), e = Number(e), t = Number(t), n.ready && !n.disabled && n.options.movable && (_(e) && (i.left = e, o = !0), _(t) && (i.top = t, o = !0), o && n.renderCanvas(!0))
                },
                zoom: function (e, t) {
                    var n = this,
                        i = n.canvas;
                    e = (e = Number(e)) < 0 ? 1 / (1 - e) : 1 + e, n.zoomTo(i.width * e / i.naturalWidth, t)
                },
                zoomTo: function (e, t) {
                    var n = this,
                        i = n.options,
                        o = n.pointers,
                        a = n.canvas,
                        s = a.width,
                        r = a.height,
                        l = a.naturalWidth,
                        u = a.naturalHeight;
                    if (0 <= (e = Number(e)) && n.ready && !n.disabled && i.zoomable) {
                        var d = l * e,
                            c = u * e,
                            h = void 0;
                        if (t && (h = t.originalEvent), n.trigger("zoom", {
                            originalEvent: h,
                            oldRatio: s / l,
                            ratio: d / l
                        }).isDefaultPrevented()) return;
                        if (h) {
                            var p = n.$cropper.offset(),
                                f = o && C(o).length ? m(o) : {
                                    pageX: t.pageX || h.pageX || 0,
                                    pageY: t.pageY || h.pageY || 0
                                };
                            a.left -= (d - s) * ((f.pageX - p.left - a.left) / s), a.top -= (c - r) * ((f.pageY - p.top - a.top) / r)
                        } else a.left -= (d - s) / 2, a.top -= (c - r) / 2;
                        a.width = d, a.height = c, n.renderCanvas(!0)
                    }
                },
                rotate: function (e) {
                    var t = this;
                    t.rotateTo((t.image.rotate || 0) + Number(e))
                },
                rotateTo: function (e) {
                    var t = this;
                    _(e = Number(e)) && t.ready && !t.disabled && t.options.rotatable && (t.image.rotate = e % 360, t.rotated = !0, t.renderCanvas(!0))
                },
                scale: function (e, t) {
                    var n = this,
                        i = n.image,
                        o = !1;
                    a(t) && (t = e), e = Number(e), t = Number(t), n.ready && !n.disabled && n.options.scalable && (_(e) && (i.scaleX = e, o = !0), _(t) && (i.scaleY = t, o = !0), o && n.renderImage(!0))
                },
                scaleX: function (e) {
                    var t = this,
                        n = t.image.scaleY;
                    t.scale(e, _(n) ? n : 1)
                },
                scaleY: function (e) {
                    var t = this,
                        n = t.image.scaleX;
                    t.scale(_(n) ? n : 1, e)
                },
                getData: function (n) {
                    var e = this,
                        t = e.options,
                        i = e.image,
                        o = e.canvas,
                        a = e.cropBox,
                        s = void 0,
                        r = void 0;
                    return e.ready && e.cropped ? (r = {
                        x: a.left - o.left,
                        y: a.top - o.top,
                        width: a.width,
                        height: a.height
                    }, s = i.width / i.naturalWidth, M.each(r, function (e, t) {
                        t /= s, r[e] = n ? Math.round(t) : t
                    })) : r = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }, t.rotatable && (r.rotate = i.rotate || 0), t.scalable && (r.scaleX = i.scaleX || 1, r.scaleY = i.scaleY || 1), r
                },
                setData: function (e) {
                    var t = this,
                        n = t.options,
                        i = t.image,
                        o = t.canvas,
                        a = {},
                        s = void 0,
                        r = void 0,
                        l = void 0;
                    M.isFunction(e) && (e = e.call(t.element)), t.ready && !t.disabled && M.isPlainObject(e) && (n.rotatable && _(e.rotate) && e.rotate !== i.rotate && (i.rotate = e.rotate, t.rotated = s = !0), n.scalable && (_(e.scaleX) && e.scaleX !== i.scaleX && (i.scaleX = e.scaleX, r = !0), _(e.scaleY) && e.scaleY !== i.scaleY && (i.scaleY = e.scaleY, r = !0)), s ? t.renderCanvas() : r && t.renderImage(), l = i.width / i.naturalWidth, _(e.x) && (a.left = e.x * l + o.left), _(e.y) && (a.top = e.y * l + o.top), _(e.width) && (a.width = e.width * l), _(e.height) && (a.height = e.height * l), t.setCropBoxData(a))
                },
                getContainerData: function () {
                    return this.ready ? this.container : {}
                },
                getImageData: function () {
                    return this.loaded ? this.image : {}
                },
                getCanvasData: function () {
                    var e = this,
                        n = e.canvas,
                        i = {};
                    return e.ready && M.each(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function (e, t) {
                        i[t] = n[t]
                    }), i
                },
                setCanvasData: function (e) {
                    var t = this,
                        n = t.canvas,
                        i = n.aspectRatio;
                    M.isFunction(e) && (e = e.call(t.$element)), t.ready && !t.disabled && M.isPlainObject(e) && (_(e.left) && (n.left = e.left), _(e.top) && (n.top = e.top), _(e.width) ? (n.width = e.width, n.height = e.width / i) : _(e.height) && (n.height = e.height, n.width = e.height * i), t.renderCanvas(!0))
                },
                getCropBoxData: function () {
                    var e = this,
                        t = e.cropBox;
                    return e.ready && e.cropped ? {
                        left: t.left,
                        top: t.top,
                        width: t.width,
                        height: t.height
                    } : {}
                },
                setCropBoxData: function (e) {
                    var t = this,
                        n = t.cropBox,
                        i = t.options.aspectRatio,
                        o = void 0,
                        a = void 0;
                    M.isFunction(e) && (e = e.call(t.$element)), t.ready && t.cropped && !t.disabled && M.isPlainObject(e) && (_(e.left) && (n.left = e.left), _(e.top) && (n.top = e.top), _(e.width) && e.width !== n.width && (o = !0, n.width = e.width), _(e.height) && e.height !== n.height && (a = !0, n.height = e.height), i && (o ? n.height = n.width / i : a && (n.width = n.height * i)), t.renderCropBox())
                },
                getCroppedCanvas: function (e) {
                    var t = this;
                    if (!t.ready || !window.HTMLCanvasElement) return null;
                    if (M.isPlainObject(e) || (e = {}), !t.cropped) return S(t.$clone[0], t.image, e);
                    var n = t.getData(),
                        i = n.width,
                        o = n.height,
                        a = i / o,
                        s = void 0,
                        r = void 0,
                        l = void 0;
                    M.isPlainObject(e) && (s = e.width, r = e.height, s ? (r = s / a, l = s / i) : r && (s = r * a, l = r / o));
                    var u = Math.floor(s || i),
                        d = Math.floor(r || o),
                        c = M("<canvas>")[0],
                        h = c.getContext("2d");
                    c.width = u, c.height = d, e.fillColor && (h.fillStyle = e.fillColor, h.fillRect(0, 0, u, d));
                    var p, f, m, v, g, y, b, _, w, x, C, k, E, T = (p = S(t.$clone[0], t.image, e), f = p.width, m = p.height, v = t.canvas, g = [p], y = n.x + v.naturalWidth * (Math.abs(n.scaleX || 1) - 1) / 2, b = n.y + v.naturalHeight * (Math.abs(n.scaleY || 1) - 1) / 2, E = k = C = x = w = _ = void 0, y <= -i || f < y ? y = _ = x = k = 0 : y <= 0 ? (x = -y, y = 0, _ = k = Math.min(f, i + y)) : y <= f && (x = 0, _ = k = Math.min(i, f - y)), _ <= 0 || b <= -o || m < b ? b = w = C = E = 0 : b <= 0 ? (C = -b, b = 0, w = E = Math.min(m, o + b)) : b <= m && (C = 0, w = E = Math.min(o, m - b)), g.push(Math.floor(y), Math.floor(b), Math.floor(_), Math.floor(w)), l && (x *= l, C *= l, k *= l, E *= l), 0 < k && 0 < E && g.push(Math.floor(x), Math.floor(C), Math.floor(k), Math.floor(E)), g);
                    return h.imageSmoothingEnabled = !!e.imageSmoothingEnabled, e.imageSmoothingQuality && (h.imageSmoothingQuality = e.imageSmoothingQuality), h.drawImage.apply(h, te(T)), c
                },
                setAspectRatio: function (e) {
                    var t = this,
                        n = t.options;
                    t.disabled || a(e) || (n.aspectRatio = Math.max(0, e) || NaN, t.ready && (t.initCropBox(), t.cropped && t.renderCropBox()))
                },
                setDragMode: function (e) {
                    var t = this,
                        n = t.options,
                        i = void 0,
                        o = void 0;
                    t.loaded && !t.disabled && (i = "crop" === e, o = n.movable && "move" === e, e = i || o ? e : "none", t.$dragBox.data("action", e).toggleClass("cropper-crop", i).toggleClass("cropper-move", o), n.cropBoxMovable || t.$face.data("action", e).toggleClass("cropper-crop", i).toggleClass("cropper-move", o))
                }
            },
            ie = "cropper-hidden",
            oe = /^data:/,
            ae = /^data:image\/jpeg;base64,/,
            se = function () {
                function i(e, t) {
                    J(this, i);
                    var n = this;
                    n.$element = M(e), n.options = M.extend({}, g, M.isPlainObject(t) && t), n.loaded = !1, n.ready = !1, n.completed = !1, n.rotated = !1, n.cropped = !1, n.disabled = !1, n.replaced = !1, n.limited = !1, n.wheeling = !1, n.isImg = !1, n.originalUrl = "", n.canvas = null, n.cropBox = null, n.pointers = {}, n.init()
                }
                return ee(i, [{
                    key: "init",
                    value: function () {
                        var e = this,
                            t = e.$element,
                            n = void 0;
                        if (t.is("img")) {
                            if (e.isImg = !0, e.originalUrl = n = t.attr("src"), !n) return;
                            n = t.prop("src")
                        } else t.is("canvas") && window.HTMLCanvasElement && (n = t[0].toDataURL());
                        e.load(n)
                    }
                }, {
                    key: "trigger",
                    value: function (e, t) {
                        var n = M.Event(e, t);
                        return this.$element.trigger(n), n
                    }
                }, {
                    key: "load",
                    value: function (e) {
                        var t = this,
                            n = t.options,
                            i = t.$element;
                        if (e) {
                            if (t.url = e, t.image = {}, !n.checkOrientation || !window.ArrayBuffer) return void t.clone();
                            if (oe.test(e)) return void (ae.test(e) ? t.read(c(e)) : t.clone());
                            var o = new XMLHttpRequest;
                            o.onerror = o.onabort = M.proxy(function () {
                                t.clone()
                            }, this), o.onload = function () {
                                t.read(this.response)
                            }, n.checkCrossOrigin && l(e) && i.prop("crossOrigin") && (e = u(e)), o.open("get", e), o.responseType = "arraybuffer", o.withCredentials = "use-credentials" === i.prop("crossOrigin"), o.send()
                        }
                    }
                }, {
                    key: "read",
                    value: function (e) {
                        var t = this,
                            n = t.options,
                            i = d(e),
                            o = t.image,
                            a = 0,
                            s = 1,
                            r = 1;
                        if (1 < i) switch (t.url = p(e), i) {
                            case 2:
                                s = -1;
                                break;
                            case 3:
                                a = -180;
                                break;
                            case 4:
                                r = -1;
                                break;
                            case 5:
                                a = 90, r = -1;
                                break;
                            case 6:
                                a = 90;
                                break;
                            case 7:
                                a = 90, s = -1;
                                break;
                            case 8:
                                a = -90
                        }
                        n.rotatable && (o.rotate = a), n.scalable && (o.scaleX = s, o.scaleY = r), t.clone()
                    }
                }, {
                    key: "clone",
                    value: function () {
                        var e = this,
                            t = e.options,
                            n = e.$element,
                            i = e.url,
                            o = "",
                            a = void 0;
                        t.checkCrossOrigin && l(i) && ((o = n.prop("crossOrigin")) ? a = i : (o = "anonymous", a = u(i))), e.crossOrigin = o, e.crossOriginUrl = a;
                        var s = document.createElement("img");
                        o && (s.crossOrigin = o), s.src = a || i;
                        var r = M(s);
                        e.$clone = r, e.isImg ? n[0].complete ? e.start() : n.one("load", M.proxy(e.start, this)) : r.one("load", M.proxy(e.start, this)).one("error", M.proxy(e.stop, this)).addClass("cropper-hide").insertAfter(n)
                    }
                }, {
                    key: "start",
                    value: function () {
                        var n = this,
                            e = n.$clone,
                            t = n.$element;
                        n.isImg || (e.off("error", n.stop), t = e), r(t[0], function (e, t) {
                            M.extend(n.image, {
                                naturalWidth: e,
                                naturalHeight: t,
                                aspectRatio: e / t
                            }), n.loaded = !0, n.build()
                        })
                    }
                }, {
                    key: "stop",
                    value: function () {
                        var e = this;
                        e.$clone.remove(), e.$clone = null
                    }
                }, {
                    key: "build",
                    value: function () {
                        var e = this,
                            t = e.options,
                            n = e.$element,
                            i = e.$clone,
                            o = void 0,
                            a = void 0,
                            s = void 0;
                        e.loaded && (e.ready && e.unbuild(), e.$container = n.parent(), e.$cropper = o = M(y), e.$canvas = o.find(".cropper-canvas").append(i), e.$dragBox = o.find(".cropper-drag-box"), e.$cropBox = a = o.find(".cropper-crop-box"), e.$viewBox = o.find(".cropper-view-box"), e.$face = s = a.find(".cropper-face"), n.addClass(ie).after(o), e.isImg || i.removeClass("cropper-hide"), e.initPreview(), e.bind(), t.aspectRatio = Math.max(0, t.aspectRatio) || NaN, t.viewMode = Math.max(0, Math.min(3, Math.round(t.viewMode))) || 0, e.cropped = t.autoCrop, t.autoCrop ? t.modal && e.$dragBox.addClass("cropper-modal") : a.addClass(ie), t.guides || a.find(".cropper-dashed").addClass(ie), t.center || a.find(".cropper-center").addClass(ie), t.cropBoxMovable && s.addClass("cropper-move").data("action", "all"), t.highlight || s.addClass("cropper-invisible"), t.background && o.addClass("cropper-bg"), t.cropBoxResizable || a.find(".cropper-line, .cropper-point").addClass(ie), e.setDragMode(t.dragMode), e.render(), e.ready = !0, e.setData(t.data), e.completing = setTimeout(function () {
                            M.isFunction(t.ready) && n.one("ready", t.ready), e.trigger("ready"), e.trigger("crop", e.getData()), e.completed = !0
                        }, 0))
                    }
                }, {
                    key: "unbuild",
                    value: function () {
                        var e = this;
                        e.ready && (e.completed || clearTimeout(e.completing), e.ready = !1, e.completed = !1, e.initialImage = null, e.initialCanvas = null, e.initialCropBox = null, e.container = null, e.canvas = null, e.cropBox = null, e.unbind(), e.resetPreview(), e.$preview = null, e.$viewBox = null, e.$cropBox = null, e.$dragBox = null, e.$canvas = null, e.$container = null, e.$cropper.remove(), e.$cropper = null)
                    }
                }], [{
                    key: "setDefaults",
                    value: function (e) {
                        M.extend(g, M.isPlainObject(e) && e)
                    }
                }]), i
            }();
        M.extend(se.prototype, n), M.extend(se.prototype, i), M.extend(se.prototype, j), M.extend(se.prototype, q), M.extend(se.prototype, G), M.extend(se.prototype, ne);
        var re = "cropper",
            le = M.fn.cropper;
        M.fn.cropper = function (s) {
            for (var e = arguments.length, r = Array(1 < e ? e - 1 : 0), t = 1; t < e; t++) r[t - 1] = arguments[t];
            var l = void 0;
            return this.each(function (e, t) {
                var n = M(t),
                    i = n.data(re);
                if (!i) {
                    if (/destroy/.test(s)) return;
                    var o = M.extend({}, n.data(), M.isPlainObject(s) && s);
                    n.data(re, i = new se(t, o))
                }
                if ("string" == typeof s) {
                    var a = i[s];
                    M.isFunction(a) && (l = a.apply(i, r))
                }
            }),
                void 0 !== l ? l : this
        }, M.fn.cropper.Constructor = se, M.fn.cropper.setDefaults = se.setDefaults, M.fn.cropper.noConflict = function () {
            return M.fn.cropper = le, this
        }
    }),
    function (e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipe = t()
    }(this, function () {
        "use strict";
        return function (h, i, e, t) {
            var f = {
                features: null,
                bind: function (e, t, n, i) {
                    var o = (i ? "remove" : "add") + "EventListener";
                    t = t.split(" ");
                    for (var a = 0; a < t.length; a++) t[a] && e[o](t[a], n, !1)
                },
                isArray: function (e) {
                    return e instanceof Array
                },
                createEl: function (e, t) {
                    var n = document.createElement(t || "div");
                    return e && (n.className = e), n
                },
                getScrollY: function () {
                    var e = window.pageYOffset;
                    return e !== undefined ? e : document.documentElement.scrollTop
                },
                unbind: function (e, t, n) {
                    f.bind(e, t, n, !0)
                },
                removeClass: function (e, t) {
                    var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                    e.className = e.className.replace(n, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                },
                addClass: function (e, t) {
                    f.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
                },
                hasClass: function (e, t) {
                    return e.className && new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
                },
                getChildByClass: function (e, t) {
                    for (var n = e.firstChild; n;) {
                        if (f.hasClass(n, t)) return n;
                        n = n.nextSibling
                    }
                },
                arraySearch: function (e, t, n) {
                    for (var i = e.length; i--;)
                        if (e[i][n] === t) return i;
                    return -1
                },
                extend: function (e, t, n) {
                    for (var i in t)
                        if (t.hasOwnProperty(i)) {
                            if (n && e.hasOwnProperty(i)) continue;
                            e[i] = t[i]
                        }
                },
                easing: {
                    sine: {
                        out: function (e) {
                            return Math.sin(e * (Math.PI / 2))
                        },
                        inOut: function (e) {
                            return -(Math.cos(Math.PI * e) - 1) / 2
                        }
                    },
                    cubic: {
                        out: function (e) {
                            return --e * e * e + 1
                        }
                    }
                },
                detectFeatures: function () {
                    if (f.features) return f.features;
                    var e = f.createEl().style,
                        t = "",
                        n = {};
                    if (n.oldIE = document.all && !document.addEventListener, n.touch = "ontouchstart" in window, window.requestAnimationFrame && (n.raf = window.requestAnimationFrame, n.caf = window.cancelAnimationFrame), n.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !n.pointerEvent) {
                        var i = navigator.userAgent;
                        if (/iP(hone|od)/.test(navigator.platform)) {
                            var o = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            o && 0 < o.length && 1 <= (o = parseInt(o[1], 10)) && o < 8 && (n.isOldIOSPhone = !0)
                        }
                        var a = i.match(/Android\s([0-9\.]*)/),
                            s = a ? a[1] : 0;
                        1 <= (s = parseFloat(s)) && (s < 4.4 && (n.isOldAndroid = !0), n.androidVersion = s), n.isMobileOpera = /opera mini|opera mobi/i.test(i)
                    }
                    for (var r, l, u = ["transform", "perspective", "animationName"], d = ["", "webkit", "Moz", "ms", "O"], c = 0; c < 4; c++) {
                        t = d[c];
                        for (var h = 0; h < 3; h++) r = u[h], l = t + (t ? r.charAt(0).toUpperCase() + r.slice(1) : r), !n[r] && l in e && (n[r] = l);
                        t && !n.raf && (t = t.toLowerCase(), n.raf = window[t + "RequestAnimationFrame"], n.raf && (n.caf = window[t + "CancelAnimationFrame"] || window[t + "CancelRequestAnimationFrame"]))
                    }
                    if (!n.raf) {
                        var p = 0;
                        n.raf = function (e) {
                            var t = (new Date).getTime(),
                                n = Math.max(0, 16 - (t - p)),
                                i = window.setTimeout(function () {
                                    e(t + n)
                                }, n);
                            return p = t + n, i
                        }, n.caf = function (e) {
                            clearTimeout(e)
                        }
                    }
                    return n.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, f.features = n
                }
            };
            f.detectFeatures(), f.features.oldIE && (f.bind = function (e, t, n, i) {
                t = t.split(" ");
                for (var o, a = (i ? "detach" : "attach") + "Event", s = function () {
                    n.handleEvent.call(n)
                }, r = 0; r < t.length; r++)
                    if (o = t[r])
                        if ("object" == typeof n && n.handleEvent) {
                            if (i) {
                                if (!n["oldIE" + o]) return !1
                            } else n["oldIE" + o] = s;
                            e[a]("on" + o, n["oldIE" + o])
                        } else e[a]("on" + o, n)
            });
            var p = this,
                n = 25,
                s = 3,
                m = {
                    allowPanToNext: !0,
                    spacing: .12,
                    bgOpacity: 1,
                    mouseUsed: !1,
                    loop: !0,
                    pinchToClose: !0,
                    closeOnScroll: !0,
                    closeOnVerticalDrag: !0,
                    verticalDragRange: .75,
                    hideAnimationDuration: 333,
                    showAnimationDuration: 333,
                    showHideOpacity: !1,
                    focus: !0,
                    escKey: !0,
                    arrowKeys: !0,
                    mainScrollEndFriction: .35,
                    panEndFriction: .35,
                    isClickableElement: function (e) {
                        return "A" === e.tagName
                    },
                    getDoubleTapZoom: function (e, t) {
                        return e ? 1 : t.initialZoomLevel < .7 ? 1 : 1.33
                    },
                    maxSpreadZoom: 1.33,
                    modal: !0,
                    scaleMode: "fit"
                };
            f.extend(m, t);
            var l, o, v, g, a, r, d, u, c, y, b, _, w, x, C, k, E, T, M, S, L, D, O, $, A, B, I, R, P, N, H, F, j, W, q, z, X, V, Y, U, K, Z, Q, G, J, ee, te, ne, ie, oe, ae, se, re, le, ue, de, ce = function () {
                return {
                    x: 0,
                    y: 0
                }
            },
                he = ce(),
                pe = ce(),
                fe = ce(),
                me = {},
                ve = 0,
                ge = {},
                ye = ce(),
                be = 0,
                _e = !0,
                we = [],
                xe = {},
                Ce = !1,
                ke = function (e, t) {
                    f.extend(p, t.publicMethods), we.push(e)
                },
                Ee = function (e) {
                    var t = Jt();
                    return t - 1 < e ? e - t : e < 0 ? t + e : e
                },
                Te = {},
                Me = function (e, t) {
                    return Te[e] || (Te[e] = []), Te[e].push(t)
                },
                Se = function (e) {
                    var t = Te[e];
                    if (t) {
                        var n = Array.prototype.slice.call(arguments);
                        n.shift();
                        for (var i = 0; i < t.length; i++) t[i].apply(p, n)
                    }
                },
                Le = function () {
                    return (new Date).getTime()
                },
                De = function (e) {
                    le = e, p.bg.style.opacity = e * m.bgOpacity
                },
                Oe = function (e, t, n, i, o) {
                    (!Ce || o && o !== p.currItem) && (i /= o ? o.fitRatio : p.currItem.fitRatio), e[D] = _ + t + "px, " + n + "px" + w + " scale(" + i + ")"
                },
                $e = function (e) {
                    ie && (e && (y > p.currItem.fitRatio ? Ce || (cn(p.currItem, !1, !0), Ce = !0) : Ce && (cn(p.currItem), Ce = !1)), Oe(ie, fe.x, fe.y, y))
                },
                Ae = function (e) {
                    e.container && Oe(e.container.style, e.initialPosition.x, e.initialPosition.y, e.initialZoomLevel, e)
                },
                Be = function (e, t) {
                    t[D] = _ + e + "px, 0px" + w
                },
                Ie = function (e, t) {
                    if (!m.loop && t) {
                        var n = g + (ye.x * ve - e) / ye.x,
                            i = Math.round(e - yt.x);
                        (n < 0 && 0 < i || n >= Jt() - 1 && i < 0) && (e = yt.x + i * m.mainScrollEndFriction)
                    }
                    yt.x = e, Be(e, a)
                },
                Re = function (e, t) {
                    var n = bt[e] - ge[e];
                    return pe[e] + he[e] + n - n * (t / b)
                },
                Pe = function (e, t) {
                    e.x = t.x, e.y = t.y, t.id && (e.id = t.id)
                },
                Ne = function (e) {
                    e.x = Math.round(e.x), e.y = Math.round(e.y)
                },
                He = null,
                Fe = function () {
                    He && (f.unbind(document, "mousemove", Fe), f.addClass(h, "pswp--has_mouse"), m.mouseUsed = !0, Se("mouseUsed")), He = setTimeout(function () {
                        He = null
                    }, 100)
                },
                je = function () {
                    f.bind(document, "keydown", p), H.transform && f.bind(p.scrollWrap, "click", p), m.mouseUsed || f.bind(document, "mousemove", Fe), f.bind(window, "resize scroll orientationchange", p), Se("bindEvents")
                },
                We = function () {
                    f.unbind(window, "resize scroll orientationchange", p), f.unbind(window, "scroll", c.scroll), f.unbind(document, "keydown", p), f.unbind(document, "mousemove", Fe), H.transform && f.unbind(p.scrollWrap, "click", p), Y && f.unbind(window, d, p), clearTimeout(F), Se("unbindEvents")
                },
                qe = function (e, t) {
                    var n = rn(p.currItem, me, e);
                    return t && (ne = n), n
                },
                ze = function (e) {
                    return e || (e = p.currItem), e.initialZoomLevel
                },
                Xe = function (e) {
                    return e || (e = p.currItem), 0 < e.w ? m.maxSpreadZoom : 1
                },
                Ve = function (e, t, n, i) {
                    return i === p.currItem.initialZoomLevel ? (n[e] = p.currItem.initialPosition[e], !0) : (n[e] = Re(e, i), n[e] > t.min[e] ? (n[e] = t.min[e], !0) : n[e] < t.max[e] && (n[e] = t.max[e], !0))
                },
                Ye = function () {
                    if (D) {
                        var e = H.perspective && !$;
                        return _ = "translate" + (e ? "3d(" : "("), void (w = H.perspective ? ", 0px)" : ")")
                    }
                    D = "left", f.addClass(h, "pswp--ie"), Be = function (e, t) {
                        t.left = e + "px"
                    }, Ae = function (e) {
                        var t = 1 < e.fitRatio ? 1 : e.fitRatio,
                            n = e.container.style,
                            i = t * e.w,
                            o = t * e.h;
                        n.width = i + "px", n.height = o + "px", n.left = e.initialPosition.x + "px", n.top = e.initialPosition.y + "px"
                    }, $e = function () {
                        if (ie) {
                            var e = ie,
                                t = p.currItem,
                                n = 1 < t.fitRatio ? 1 : t.fitRatio,
                                i = n * t.w,
                                o = n * t.h;
                            e.width = i + "px", e.height = o + "px", e.left = fe.x + "px", e.top = fe.y + "px"
                        }
                    }
                },
                Ue = function (e) {
                    var t = "";
                    m.escKey && 27 === e.keyCode ? t = "close" : m.arrowKeys && (37 === e.keyCode ? t = "prev" : 39 === e.keyCode && (t = "next")), t && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault ? e.preventDefault() : e.returnValue = !1, p[t]()))
                },
                Ke = function (e) {
                    e && (Z || K || oe || X) && (e.preventDefault(), e.stopPropagation())
                },
                Ze = function () {
                    p.setScrollOffset(0, f.getScrollY())
                },
                Qe = {},
                Ge = 0,
                Je = function (e) {
                    Qe[e] && (Qe[e].raf && B(Qe[e].raf), Ge-- , delete Qe[e])
                },
                et = function (e) {
                    Qe[e] && Je(e), Qe[e] || (Ge++ , Qe[e] = {})
                },
                tt = function () {
                    for (var e in Qe) Qe.hasOwnProperty(e) && Je(e)
                },
                nt = function (e, t, n, i, o, a, s) {
                    var r, l = Le();
                    et(e);
                    var u = function () {
                        if (Qe[e]) {
                            if (r = Le() - l, i <= r) return Je(e), a(n), void (s && s());
                            a((n - t) * o(r / i) + t), Qe[e].raf = A(u)
                        }
                    };
                    u()
                },
                it = {
                    shout: Se,
                    listen: Me,
                    viewportSize: me,
                    options: m,
                    isMainScrollAnimating: function () {
                        return oe
                    },
                    getZoomLevel: function () {
                        return y
                    },
                    getCurrentIndex: function () {
                        return g
                    },
                    isDragging: function () {
                        return Y
                    },
                    isZooming: function () {
                        return ee
                    },
                    setScrollOffset: function (e, t) {
                        ge.x = e, N = ge.y = t, Se("updateScrollOffset", ge)
                    },
                    applyZoomPan: function (e, t, n, i) {
                        fe.x = t, fe.y = n, y = e, $e(i)
                    },
                    init: function () {
                        if (!l && !o) {
                            var e;
                            p.framework = f, p.template = h, p.bg = f.getChildByClass(h, "pswp__bg"), I = h.className, l = !0, H = f.detectFeatures(), A = H.raf, B = H.caf, D = H.transform, P = H.oldIE, p.scrollWrap = f.getChildByClass(h, "pswp__scroll-wrap"), p.container = f.getChildByClass(p.scrollWrap, "pswp__container"), a = p.container.style, p.itemHolders = k = [{
                                el: p.container.children[0],
                                wrap: 0,
                                index: -1
                            }, {
                                el: p.container.children[1],
                                wrap: 0,
                                index: -1
                            }, {
                                el: p.container.children[2],
                                wrap: 0,
                                index: -1
                            }], k[0].el.style.display = k[2].el.style.display = "none", Ye(), c = {
                                resize: p.updateSize,
                                orientationchange: function () {
                                    clearTimeout(F), F = setTimeout(function () {
                                        me.x !== p.scrollWrap.clientWidth && p.updateSize()
                                    }, 500)
                                },
                                scroll: Ze,
                                keydown: Ue,
                                click: Ke
                            };
                            var t = H.isOldIOSPhone || H.isOldAndroid || H.isMobileOpera;
                            for (H.animationName && H.transform && !t || (m.showAnimationDuration = m.hideAnimationDuration = 0), e = 0; e < we.length; e++) p["init" + we[e]]();
                            if (i) (p.ui = new i(p, f)).init();
                            Se("firstUpdate"), g = g || m.index || 0, (isNaN(g) || g < 0 || g >= Jt()) && (g = 0), p.currItem = Gt(g), (H.isOldIOSPhone || H.isOldAndroid) && (_e = !1), h.setAttribute("aria-hidden", "false"), m.modal && (_e ? h.style.position = "fixed" : (h.style.position = "absolute", h.style.top = f.getScrollY() + "px")), N === undefined && (Se("initialLayout"), N = R = f.getScrollY());
                            var n = "pswp--open ";
                            for (m.mainClass && (n += m.mainClass + " "), m.showHideOpacity && (n += "pswp--animate_opacity "), n += $ ? "pswp--touch" : "pswp--notouch", n += H.animationName ? " pswp--css_animation" : "", n += H.svg ? " pswp--svg" : "", f.addClass(h, n), p.updateSize(), r = -1, be = null, e = 0; e < s; e++) Be((e + r) * ye.x, k[e].el.style);
                            P || f.bind(p.scrollWrap, u, p), Me("initialZoomInEnd", function () {
                                p.setContent(k[0], g - 1), p.setContent(k[2], g + 1), k[0].el.style.display = k[2].el.style.display = "block", m.focus && h.focus(), je()
                            }), p.setContent(k[1], g), p.updateCurrItem(), Se("afterInit"), _e || (x = setInterval(function () {
                                Ge || Y || ee || y !== p.currItem.initialZoomLevel || p.updateSize()
                            }, 1e3)), f.addClass(h, "pswp--visible")
                        }
                    },
                    close: function () {
                        l && (o = !(l = !1), Se("close"), We(), en(p.currItem, null, !0, p.destroy))
                    },
                    destroy: function () {
                        Se("destroy"), Ut && clearTimeout(Ut), h.setAttribute("aria-hidden", "true"), h.className = I, x && clearInterval(x), f.unbind(p.scrollWrap, u, p), f.unbind(window, "scroll", p), kt(), tt(), Te = null
                    },
                    panTo: function (e, t, n) {
                        n || (e > ne.min.x ? e = ne.min.x : e < ne.max.x && (e = ne.max.x), t > ne.min.y ? t = ne.min.y : t < ne.max.y && (t = ne.max.y)), fe.x = e, fe.y = t, $e()
                    },
                    handleEvent: function (e) {
                        e = e || window.event, c[e.type] && c[e.type](e)
                    },
                    goTo: function (e) {
                        var t = (e = Ee(e)) - g;
                        be = t, g = e, p.currItem = Gt(g), ve -= t, Ie(ye.x * ve), tt(), oe = !1, p.updateCurrItem()
                    },
                    next: function () {
                        p.goTo(g + 1)
                    },
                    prev: function () {
                        p.goTo(g - 1)
                    },
                    updateCurrZoomItem: function (e) {
                        if (e && Se("beforeChange", 0), k[1].el.children.length) {
                            var t = k[1].el.children[0];
                            ie = f.hasClass(t, "pswp__zoom-wrap") ? t.style : null
                        } else ie = null;
                        ne = p.currItem.bounds, b = y = p.currItem.initialZoomLevel, fe.x = ne.center.x, fe.y = ne.center.y, e && Se("afterChange")
                    },
                    invalidateCurrItems: function () {
                        C = !0;
                        for (var e = 0; e < s; e++) k[e].item && (k[e].item.needsUpdate = !0)
                    },
                    updateCurrItem: function (e) {
                        if (0 !== be) {
                            var t, n = Math.abs(be);
                            if (!(e && n < 2)) {
                                p.currItem = Gt(g), Ce = !1, Se("beforeChange", be), s <= n && (r += be + (0 < be ? -s : s), n = s);
                                for (var i = 0; i < n; i++) 0 < be ? (t = k.shift(), k[s - 1] = t, Be((++r + 2) * ye.x, t.el.style), p.setContent(t, g - n + i + 1 + 1)) : (t = k.pop(), k.unshift(t), Be(--r * ye.x, t.el.style), p.setContent(t, g + n - i - 1 - 1));
                                if (ie && 1 === Math.abs(be)) {
                                    var o = Gt(E);
                                    o.initialZoomLevel !== y && (rn(o, me), cn(o), Ae(o))
                                }
                                be = 0, p.updateCurrZoomItem(), E = g, Se("afterChange")
                            }
                        }
                    },
                    updateSize: function (e) {
                        if (!_e && m.modal) {
                            var t = f.getScrollY();
                            if (N !== t && (h.style.top = t + "px", N = t), !e && xe.x === window.innerWidth && xe.y === window.innerHeight) return;
                            xe.x = window.innerWidth, xe.y = window.innerHeight, h.style.height = xe.y + "px"
                        }
                        if (me.x = p.scrollWrap.clientWidth, me.y = p.scrollWrap.clientHeight, Ze(), ye.x = me.x + Math.round(me.x * m.spacing), ye.y = me.y, Ie(ye.x * ve), Se("beforeResize"), r !== undefined) {
                            for (var n, i, o, a = 0; a < s; a++) n = k[a], Be((a + r) * ye.x, n.el.style), o = g + a - 1, m.loop && 2 < Jt() && (o = Ee(o)), (i = Gt(o)) && (C || i.needsUpdate || !i.bounds) ? (p.cleanSlide(i), p.setContent(n, o), 1 === a && (p.currItem = i, p.updateCurrZoomItem(!0)), i.needsUpdate = !1) : -1 === n.index && 0 <= o && p.setContent(n, o), i && i.container && (rn(i, me), cn(i), Ae(i));
                            C = !1
                        }
                        b = y = p.currItem.initialZoomLevel, (ne = p.currItem.bounds) && (fe.x = ne.center.x, fe.y = ne.center.y, $e(!0)), Se("resize")
                    },
                    zoomTo: function (t, e, n, i, o) {
                        e && (b = y, bt.x = Math.abs(e.x) - fe.x, bt.y = Math.abs(e.y) - fe.y, Pe(pe, fe));
                        var a = qe(t, !1),
                            s = {};
                        Ve("x", a, s, t), Ve("y", a, s, t);
                        var r = y,
                            l = {
                                x: fe.x,
                                y: fe.y
                            };
                        Ne(s);
                        var u = function (e) {
                            1 === e ? (y = t, fe.x = s.x, fe.y = s.y) : (y = (t - r) * e + r, fe.x = (s.x - l.x) * e + l.x, fe.y = (s.y - l.y) * e + l.y), o && o(e), $e(1 === e)
                        };
                        n ? nt("customZoomTo", 0, 1, n, i || f.easing.sine.inOut, u) : u(1)
                    }
                },
                ot = 30,
                at = 10,
                st = {},
                rt = {},
                lt = {},
                ut = {},
                dt = {},
                ct = [],
                ht = {},
                pt = [],
                ft = {},
                mt = 0,
                vt = ce(),
                gt = 0,
                yt = ce(),
                bt = ce(),
                _t = ce(),
                wt = function (e, t) {
                    return e.x === t.x && e.y === t.y
                },
                xt = function (e, t) {
                    return Math.abs(e.x - t.x) < n && Math.abs(e.y - t.y) < n
                },
                Ct = function (e, t) {
                    return ft.x = Math.abs(e.x - t.x), ft.y = Math.abs(e.y - t.y), Math.sqrt(ft.x * ft.x + ft.y * ft.y)
                },
                kt = function () {
                    Q && (B(Q), Q = null)
                },
                Et = function () {
                    Y && (Q = A(Et), jt())
                },
                Tt = function () {
                    return !("fit" === m.scaleMode && y === p.currItem.initialZoomLevel)
                },
                Mt = function (e, t) {
                    return !(!e || e === document) && (!(e.getAttribute("class") && -1 < e.getAttribute("class").indexOf("pswp__scroll-wrap")) && (t(e) ? e : Mt(e.parentNode, t)))
                },
                St = {},
                Lt = function (e, t) {
                    return St.prevent = !Mt(e.target, m.isClickableElement), Se("preventDragEvent", e, t, St), St.prevent
                },
                Dt = function (e, t) {
                    return t.x = e.pageX, t.y = e.pageY, t.id = e.identifier, t
                },
                Ot = function (e, t, n) {
                    n.x = .5 * (e.x + t.x), n.y = .5 * (e.y + t.y)
                },
                $t = function (e, t, n) {
                    if (50 < e - W) {
                        var i = 2 < pt.length ? pt.shift() : {};
                        i.x = t, i.y = n, pt.push(i), W = e
                    }
                },
                At = function () {
                    var e = fe.y - p.currItem.initialPosition.y;
                    return 1 - Math.abs(e / (me.y / 2))
                },
                Bt = {},
                It = {},
                Rt = [],
                Pt = function (e) {
                    for (; 0 < Rt.length;) Rt.pop();
                    return O ? (de = 0, ct.forEach(function (e) {
                        0 === de ? Rt[0] = e : 1 === de && (Rt[1] = e), de++
                    })) : -1 < e.type.indexOf("touch") ? e.touches && 0 < e.touches.length && (Rt[0] = Dt(e.touches[0], Bt), 1 < e.touches.length && (Rt[1] = Dt(e.touches[1], It))) : (Bt.x = e.pageX, Bt.y = e.pageY, Bt.id = "", Rt[0] = Bt), Rt
                },
                Nt = function (e, t) {
                    var n, i, o, a, s = fe[e] + t[e],
                        r = 0 < t[e],
                        l = yt.x + t.x,
                        u = yt.x - ht.x;
                    if (n = s > ne.min[e] || s < ne.max[e] ? m.panEndFriction : 1, s = fe[e] + t[e] * n, (m.allowPanToNext || y === p.currItem.initialZoomLevel) && (ie ? "h" !== ae || "x" !== e || K || (r ? (s > ne.min[e] && (n = m.panEndFriction, ne.min[e] - s, i = ne.min[e] - pe[e]), (i <= 0 || u < 0) && 1 < Jt() ? (a = l, u < 0 && l > ht.x && (a = ht.x)) : ne.min.x !== ne.max.x && (o = s)) : (s < ne.max[e] && (n = m.panEndFriction, s - ne.max[e], i = pe[e] - ne.max[e]), (i <= 0 || 0 < u) && 1 < Jt() ? (a = l, 0 < u && l < ht.x && (a = ht.x)) : ne.min.x !== ne.max.x && (o = s))) : a = l, "x" === e)) return a !== undefined && (Ie(a, !0), G = a !== ht.x), ne.min.x !== ne.max.x && (o !== undefined ? fe.x = o : G || (fe.x += t.x * n)), a !== undefined;
                    oe || G || y > p.currItem.fitRatio && (fe[e] += t[e] * n)
                },
                Ht = function (e) {
                    if (!("mousedown" === e.type && 0 < e.button))
                        if (Qt) e.preventDefault();
                        else if (!V || "mousedown" !== e.type) {
                            if (Lt(e, !0) && e.preventDefault(), Se("pointerDown"), O) {
                                var t = f.arraySearch(ct, e.pointerId, "id");
                                t < 0 && (t = ct.length), ct[t] = {
                                    x: e.pageX,
                                    y: e.pageY,
                                    id: e.pointerId
                                }
                            }
                            var n = Pt(e),
                                i = n.length;
                            J = null, tt(), Y && 1 !== i || (Y = se = !0, f.bind(window, d, p), z = ue = re = X = G = Z = U = K = !1, ae = null, Se("firstTouchStart", n), Pe(pe, fe), he.x = he.y = 0, Pe(ut, n[0]), Pe(dt, ut), ht.x = ye.x * ve, pt = [{
                                x: ut.x,
                                y: ut.y
                            }], W = j = Le(), qe(y, !0), kt(), Et()), !ee && 1 < i && !oe && !G && (b = y, ee = U = !(K = !1), he.y = he.x = 0, Pe(pe, fe), Pe(st, n[0]), Pe(rt, n[1]), Ot(st, rt, _t), bt.x = Math.abs(_t.x) - fe.x, bt.y = Math.abs(_t.y) - fe.y, te = Ct(st, rt))
                        }
                },
                Ft = function (e) {
                    if (e.preventDefault(), O) {
                        var t = f.arraySearch(ct, e.pointerId, "id");
                        if (-1 < t) {
                            var n = ct[t];
                            n.x = e.pageX, n.y = e.pageY
                        }
                    }
                    if (Y) {
                        var i = Pt(e);
                        if (ae || Z || ee) J = i;
                        else if (yt.x !== ye.x * ve) ae = "h";
                        else {
                            var o = Math.abs(i[0].x - ut.x) - Math.abs(i[0].y - ut.y);
                            Math.abs(o) >= at && (ae = 0 < o ? "h" : "v", J = i)
                        }
                    }
                },
                jt = function () {
                    if (J) {
                        var e = J.length;
                        if (0 !== e)
                            if (Pe(st, J[0]), lt.x = st.x - ut.x, lt.y = st.y - ut.y, ee && 1 < e) {
                                if (ut.x = st.x, ut.y = st.y, !lt.x && !lt.y && wt(J[1], rt)) return;
                                Pe(rt, J[1]), K || (K = !0, Se("zoomGestureStarted"));
                                var t = Ct(st, rt),
                                    n = Vt(t);
                                n > p.currItem.initialZoomLevel + p.currItem.initialZoomLevel / 15 && (ue = !0);
                                var i = 1,
                                    o = ze(),
                                    a = Xe();
                                if (n < o)
                                    if (m.pinchToClose && !ue && b <= p.currItem.initialZoomLevel) {
                                        var s = 1 - (o - n) / (o / 1.2);
                                        De(s), Se("onPinchClose", s), re = !0
                                    } else 1 < (i = (o - n) / o) && (i = 1), n = o - i * (o / 3);
                                else a < n && (1 < (i = (n - a) / (6 * o)) && (i = 1), n = a + i * o);
                                i < 0 && (i = 0), t, Ot(st, rt, vt), he.x += vt.x - _t.x, he.y += vt.y - _t.y, Pe(_t, vt), fe.x = Re("x", n), fe.y = Re("y", n), z = y < n, y = n, $e()
                            } else {
                                if (!ae) return;
                                if (se && (se = !1, Math.abs(lt.x) >= at && (lt.x -= J[0].x - dt.x), Math.abs(lt.y) >= at && (lt.y -= J[0].y - dt.y)), ut.x = st.x, ut.y = st.y, 0 === lt.x && 0 === lt.y) return;
                                if ("v" === ae && m.closeOnVerticalDrag && !Tt()) {
                                    he.y += lt.y, fe.y += lt.y;
                                    var r = At();
                                    return X = !0, Se("onVerticalDrag", r), De(r), void $e()
                                }
                                $t(Le(), st.x, st.y), Z = !0, ne = p.currItem.bounds, Nt("x", lt) || (Nt("y", lt), Ne(fe), $e())
                            }
                    }
                },
                Wt = function (e) {
                    if (H.isOldAndroid) {
                        if (V && "mouseup" === e.type) return; - 1 < e.type.indexOf("touch") && (clearTimeout(V), V = setTimeout(function () {
                            V = 0
                        }, 600))
                    }
                    var t;
                    if (Se("pointerUp"), Lt(e, !1) && e.preventDefault(), O) {
                        var n = f.arraySearch(ct, e.pointerId, "id");
                        if (-1 < n)
                            if (t = ct.splice(n, 1)[0], navigator.pointerEnabled) t.type = e.pointerType || "mouse";
                            else {
                                var i = {
                                    4: "mouse",
                                    2: "touch",
                                    3: "pen"
                                };
                                t.type = i[e.pointerType], t.type || (t.type = e.pointerType || "mouse")
                            }
                    }
                    var o, a = Pt(e),
                        s = a.length;
                    if ("mouseup" === e.type && (s = 0), 2 === s) return !(J = null);
                    1 === s && Pe(dt, a[0]), 0 !== s || ae || oe || (t || ("mouseup" === e.type ? t = {
                        x: e.pageX,
                        y: e.pageY,
                        type: "mouse"
                    } : e.changedTouches && e.changedTouches[0] && (t = {
                        x: e.changedTouches[0].pageX,
                        y: e.changedTouches[0].pageY,
                        type: "touch"
                    })), Se("touchRelease", e, t));
                    var r = -1;
                    if (0 === s && (Y = !1, f.unbind(window, d, p), kt(), ee ? r = 0 : -1 !== gt && (r = Le() - gt)), gt = 1 === s ? Le() : -1, o = -1 !== r && r < 150 ? "zoom" : "swipe", ee && s < 2 && (ee = !1, 1 === s && (o = "zoomPointerUp"), Se("zoomGestureEnded")), J = null, Z || K || oe || X)
                        if (tt(), q || (q = qt()), q.calculateSwipeSpeed("x"), X) {
                            if (At() < m.verticalDragRange) p.close();
                            else {
                                var l = fe.y,
                                    u = le;
                                nt("verticalDrag", 0, 1, 300, f.easing.cubic.out, function (e) {
                                    fe.y = (p.currItem.initialPosition.y - l) * e + l, De((1 - u) * e + u), $e()
                                }), Se("onVerticalDrag", 1)
                            }
                        } else {
                            if ((G || oe) && 0 === s) {
                                if (Xt(o, q)) return;
                                o = "zoomPointerUp"
                            }
                            oe || ("swipe" === o ? !G && y > p.currItem.fitRatio && zt(q) : Yt())
                        }
                },
                qt = function () {
                    var t, n, i = {
                        lastFlickOffset: {},
                        lastFlickDist: {},
                        lastFlickSpeed: {},
                        slowDownRatio: {},
                        slowDownRatioReverse: {},
                        speedDecelerationRatio: {},
                        speedDecelerationRatioAbs: {},
                        distanceOffset: {},
                        backAnimDestination: {},
                        backAnimStarted: {},
                        calculateSwipeSpeed: function (e) {
                            1 < pt.length ? (t = Le() - W + 50, n = pt[pt.length - 2][e]) : (t = Le() - j, n = dt[e]), i.lastFlickOffset[e] = ut[e] - n, i.lastFlickDist[e] = Math.abs(i.lastFlickOffset[e]), 20 < i.lastFlickDist[e] ? i.lastFlickSpeed[e] = i.lastFlickOffset[e] / t : i.lastFlickSpeed[e] = 0, Math.abs(i.lastFlickSpeed[e]) < .1 && (i.lastFlickSpeed[e] = 0), i.slowDownRatio[e] = .95, i.slowDownRatioReverse[e] = 1 - i.slowDownRatio[e], i.speedDecelerationRatio[e] = 1
                        },
                        calculateOverBoundsAnimOffset: function (t, e) {
                            i.backAnimStarted[t] || (fe[t] > ne.min[t] ? i.backAnimDestination[t] = ne.min[t] : fe[t] < ne.max[t] && (i.backAnimDestination[t] = ne.max[t]), i.backAnimDestination[t] !== undefined && (i.slowDownRatio[t] = .7, i.slowDownRatioReverse[t] = 1 - i.slowDownRatio[t], i.speedDecelerationRatioAbs[t] < .05 && (i.lastFlickSpeed[t] = 0, i.backAnimStarted[t] = !0, nt("bounceZoomPan" + t, fe[t], i.backAnimDestination[t], e || 300, f.easing.sine.out, function (e) {
                                fe[t] = e, $e()
                            }))))
                        },
                        calculateAnimOffset: function (e) {
                            i.backAnimStarted[e] || (i.speedDecelerationRatio[e] = i.speedDecelerationRatio[e] * (i.slowDownRatio[e] + i.slowDownRatioReverse[e] - i.slowDownRatioReverse[e] * i.timeDiff / 10), i.speedDecelerationRatioAbs[e] = Math.abs(i.lastFlickSpeed[e] * i.speedDecelerationRatio[e]), i.distanceOffset[e] = i.lastFlickSpeed[e] * i.speedDecelerationRatio[e] * i.timeDiff, fe[e] += i.distanceOffset[e])
                        },
                        panAnimLoop: function () {
                            if (Qe.zoomPan && (Qe.zoomPan.raf = A(i.panAnimLoop), i.now = Le(), i.timeDiff = i.now - i.lastNow, i.lastNow = i.now, i.calculateAnimOffset("x"), i.calculateAnimOffset("y"), $e(), i.calculateOverBoundsAnimOffset("x"), i.calculateOverBoundsAnimOffset("y"), i.speedDecelerationRatioAbs.x < .05 && i.speedDecelerationRatioAbs.y < .05)) return fe.x = Math.round(fe.x), fe.y = Math.round(fe.y), $e(), void Je("zoomPan")
                        }
                    };
                    return i
                },
                zt = function (e) {
                    if (e.calculateSwipeSpeed("y"), ne = p.currItem.bounds, e.backAnimDestination = {}, e.backAnimStarted = {}, Math.abs(e.lastFlickSpeed.x) <= .05 && Math.abs(e.lastFlickSpeed.y) <= .05) return e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y = 0, e.calculateOverBoundsAnimOffset("x"), e.calculateOverBoundsAnimOffset("y"), !0;
                    et("zoomPan"), e.lastNow = Le(), e.panAnimLoop()
                },
                Xt = function (e, t) {
                    var n, i, o;
                    if (oe || (mt = g), "swipe" === e) {
                        var a = ut.x - dt.x,
                            s = t.lastFlickDist.x < 10;
                        ot < a && (s || 20 < t.lastFlickOffset.x) ? i = -1 : a < -ot && (s || t.lastFlickOffset.x < -20) && (i = 1)
                    }
                    i && ((g += i) < 0 ? (g = m.loop ? Jt() - 1 : 0, o = !0) : g >= Jt() && (g = m.loop ? 0 : Jt() - 1, o = !0), o && !m.loop || (be += i, ve -= i, n = !0));
                    var r, l = ye.x * ve,
                        u = Math.abs(l - yt.x);
                    return n || l > yt.x == 0 < t.lastFlickSpeed.x ? (r = 0 < Math.abs(t.lastFlickSpeed.x) ? u / Math.abs(t.lastFlickSpeed.x) : 333, r = Math.min(r, 400), r = Math.max(r, 250)) : r = 333, mt === g && (n = !1), oe = !0, Se("mainScrollAnimStart"), nt("mainScroll", yt.x, l, r, f.easing.cubic.out, Ie, function () {
                        tt(), oe = !1, mt = -1, (n || mt !== g) && p.updateCurrItem(), Se("mainScrollAnimComplete")
                    }), n && p.updateCurrItem(!0), n
                },
                Vt = function (e) {
                    return 1 / te * e * b
                },
                Yt = function () {
                    var e = y,
                        t = ze(),
                        n = Xe();
                    y < t ? e = t : n < y && (e = n);
                    var i, o = 1,
                        a = le;
                    return re && !z && !ue && y < t ? p.close() : (re && (i = function (e) {
                        De((o - a) * e + a)
                    }), p.zoomTo(e, 0, 200, f.easing.cubic.out, i)), !0
                };
            ke("Gestures", {
                publicMethods: {
                    initGestures: function () {
                        var e = function (e, t, n, i, o) {
                            T = e + t, M = e + n, S = e + i, L = o ? e + o : ""
                        };
                        (O = H.pointerEvent) && H.touch && (H.touch = !1), O ? navigator.pointerEnabled ? e("pointer", "down", "move", "up", "cancel") : e("MSPointer", "Down", "Move", "Up", "Cancel") : H.touch ? (e("touch", "start", "move", "end", "cancel"), $ = !0) : e("mouse", "down", "move", "up"), d = M + " " + S + " " + L, u = T, O && !$ && ($ = 1 < navigator.maxTouchPoints || 1 < navigator.msMaxTouchPoints), p.likelyTouchDevice = $, c[T] = Ht, c[M] = Ft, c[S] = Wt, L && (c[L] = c[S]), H.touch && (u += " mousedown", d += " mousemove mouseup", c.mousedown = c[T], c.mousemove = c[M], c.mouseup = c[S]), $ || (m.allowPanToNext = !1)
                    }
                }
            });
            var Ut, Kt, Zt, Qt, Gt, Jt, en = function (r, e, l, t) {
                var u;
                Ut && clearTimeout(Ut), Zt = Qt = !0, r.initialLayout ? (u = r.initialLayout, r.initialLayout = null) : u = m.getThumbBoundsFn && m.getThumbBoundsFn(g);
                var d = l ? m.hideAnimationDuration : m.showAnimationDuration,
                    c = function () {
                        Je("initialZoom"), l ? (p.template.removeAttribute("style"), p.bg.removeAttribute("style")) : (De(1), e && (e.style.display = "block"), f.addClass(h, "pswp--animated-in"), Se("initialZoom" + (l ? "OutEnd" : "InEnd"))), t && t(), Qt = !1
                    };
                if (!d || !u || u.x === undefined) return Se("initialZoom" + (l ? "Out" : "In")), y = r.initialZoomLevel, Pe(fe, r.initialPosition), $e(), h.style.opacity = l ? 0 : 1, De(1), void (d ? setTimeout(function () {
                    c()
                }, d) : c());
                (function () {
                    var a = v,
                        s = !p.currItem.src || p.currItem.loadError || m.showHideOpacity;
                    r.miniImg && (r.miniImg.style.webkitBackfaceVisibility = "hidden"), l || (y = u.w / r.w, fe.x = u.x, fe.y = u.y - R, p[s ? "template" : "bg"].style.opacity = .001, $e()), et("initialZoom"), l && !a && f.removeClass(h, "pswp--animated-in"), s && (l ? f[(a ? "remove" : "add") + "Class"](h, "pswp--animate_opacity") : setTimeout(function () {
                        f.addClass(h, "pswp--animate_opacity")
                    }, 30)), Ut = setTimeout(function () {
                        if (Se("initialZoom" + (l ? "Out" : "In")), l) {
                            var t = u.w / r.w,
                                n = {
                                    x: fe.x,
                                    y: fe.y
                                },
                                i = y,
                                o = le,
                                e = function (e) {
                                    1 === e ? (y = t, fe.x = u.x, fe.y = u.y - N) : (y = (t - i) * e + i, fe.x = (u.x - n.x) * e + n.x, fe.y = (u.y - N - n.y) * e + n.y), $e(), s ? h.style.opacity = 1 - e : De(o - e * o)
                                };
                            a ? nt("initialZoom", 0, 1, d, f.easing.cubic.out, e, c) : (e(1), Ut = setTimeout(c, d + 20))
                        } else y = r.initialZoomLevel, Pe(fe, r.initialPosition), $e(), De(1), s ? h.style.opacity = 1 : De(1), Ut = setTimeout(c, d + 20)
                    }, l ? 25 : 90)
                })()
            },
                tn = {},
                nn = [],
                on = {
                    index: 0,
                    errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                    forceProgressiveLoading: !1,
                    preload: [1, 1],
                    getNumItemsFn: function () {
                        return Kt.length
                    }
                },
                an = function () {
                    return {
                        center: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 0,
                            y: 0
                        },
                        min: {
                            x: 0,
                            y: 0
                        }
                    }
                },
                sn = function (e, t, n) {
                    var i = e.bounds;
                    i.center.x = Math.round((tn.x - t) / 2), i.center.y = Math.round((tn.y - n) / 2) + e.vGap.top, i.max.x = t > tn.x ? Math.round(tn.x - t) : i.center.x, i.max.y = n > tn.y ? Math.round(tn.y - n) + e.vGap.top : i.center.y, i.min.x = t > tn.x ? 0 : i.center.x, i.min.y = n > tn.y ? e.vGap.top : i.center.y
                },
                rn = function (e, t, n) {
                    if (e.src && !e.loadError) {
                        var i = !n;
                        if (i && (e.vGap || (e.vGap = {
                            top: 0,
                            bottom: 0
                        }), Se("parseVerticalMargin", e)), tn.x = t.x, tn.y = t.y - e.vGap.top - e.vGap.bottom, i) {
                            var o = tn.x / e.w,
                                a = tn.y / e.h;
                            e.fitRatio = o < a ? o : a;
                            var s = m.scaleMode;
                            "orig" === s ? n = 1 : "fit" === s && (n = e.fitRatio), 1 < n && (n = 1), e.initialZoomLevel = n, e.bounds || (e.bounds = an())
                        }
                        if (!n) return;
                        return sn(e, e.w * n, e.h * n), i && n === e.initialZoomLevel && (e.initialPosition = e.bounds.center), e.bounds
                    }
                    return e.w = e.h = 0, e.initialZoomLevel = e.fitRatio = 1, e.bounds = an(), e.initialPosition = e.bounds.center, e.bounds
                },
                ln = function (e, t, n, i, o, a) {
                    t.loadError || i && (t.imageAppended = !0, cn(t, i, t === p.currItem && Ce), n.appendChild(i), a && setTimeout(function () {
                        t && t.loaded && t.placeholder && (t.placeholder.style.display = "none", t.placeholder = null)
                    }, 500))
                },
                un = function (e) {
                    e.loading = !0, e.loaded = !1;
                    var t = e.img = f.createEl("pswp__img", "img"),
                        n = function () {
                            e.loading = !1, e.loaded = !0, e.loadComplete ? e.loadComplete(e) : e.img = null, t.onload = t.onerror = null, t = null
                        };
                    return t.onload = n, t.onerror = function () {
                        e.loadError = !0, n()
                    }, t.src = e.src, t
                },
                dn = function (e, t) {
                    if (e.src && e.loadError && e.container) return t && (e.container.innerHTML = ""), e.container.innerHTML = m.errorMsg.replace("%url%", e.src), !0
                },
                cn = function (e, t, n) {
                    if (e.src) {
                        t || (t = e.container.lastChild);
                        var i = n ? e.w : Math.round(e.w * e.fitRatio),
                            o = n ? e.h : Math.round(e.h * e.fitRatio);
                        e.placeholder && !e.loaded && (e.placeholder.style.width = i + "px", e.placeholder.style.height = o + "px"), t.style.width = i + "px", t.style.height = o + "px"
                    }
                },
                hn = function () {
                    if (nn.length) {
                        for (var e, t = 0; t < nn.length; t++)(e = nn[t]).holder.index === e.index && ln(e.index, e.item, e.baseDiv, e.img, !1, e.clearPlaceholder);
                        nn = []
                    }
                };
            ke("Controller", {
                publicMethods: {
                    lazyLoadItem: function (e) {
                        e = Ee(e);
                        var t = Gt(e);
                        t && (!t.loaded && !t.loading || C) && (Se("gettingData", e, t), t.src && un(t))
                    },
                    initController: function () {
                        f.extend(m, on, !0), p.items = Kt = e, Gt = p.getItemAt, Jt = m.getNumItemsFn, m.loop, Jt() < 3 && (m.loop = !1), Me("beforeChange", function (e) {
                            var t, n = m.preload,
                                i = null === e || 0 <= e,
                                o = Math.min(n[0], Jt()),
                                a = Math.min(n[1], Jt());
                            for (t = 1; t <= (i ? a : o); t++) p.lazyLoadItem(g + t);
                            for (t = 1; t <= (i ? o : a); t++) p.lazyLoadItem(g - t)
                        }), Me("initialLayout", function () {
                            p.currItem.initialLayout = m.getThumbBoundsFn && m.getThumbBoundsFn(g)
                        }), Me("mainScrollAnimComplete", hn), Me("initialZoomInEnd", hn), Me("destroy", function () {
                            for (var e, t = 0; t < Kt.length; t++)(e = Kt[t]).container && (e.container = null), e.placeholder && (e.placeholder = null), e.img && (e.img = null), e.preloader && (e.preloader = null), e.loadError && (e.loaded = e.loadError = !1);
                            nn = null
                        })
                    },
                    getItemAt: function (e) {
                        return 0 <= e && (Kt[e] !== undefined && Kt[e])
                    },
                    allowProgressiveImg: function () {
                        return m.forceProgressiveLoading || !$ || m.mouseUsed || 1200 < screen.width
                    },
                    setContent: function (t, n) {
                        m.loop && (n = Ee(n));
                        var e = p.getItemAt(t.index);
                        e && (e.container = null);
                        var i, o = p.getItemAt(n);
                        if (o) {
                            Se("gettingData", n, o), t.index = n;
                            var a = (t.item = o).container = f.createEl("pswp__zoom-wrap");
                            if (!o.src && o.html && (o.html.tagName ? a.appendChild(o.html) : a.innerHTML = o.html), dn(o), rn(o, me), !o.src || o.loadError || o.loaded) o.src && !o.loadError && ((i = f.createEl("pswp__img", "img")).style.opacity = 1, i.src = o.src, cn(o, i), ln(n, o, a, i, !0));
                            else {
                                if (o.loadComplete = function (e) {
                                    if (l) {
                                        if (t && t.index === n) {
                                            if (dn(e, !0)) return e.loadComplete = e.img = null, rn(e, me), Ae(e), void (t.index === g && p.updateCurrZoomItem());
                                            e.imageAppended ? !Qt && e.placeholder && (e.placeholder.style.display = "none", e.placeholder = null) : H.transform && (oe || Qt) ? nn.push({
                                                item: e,
                                                baseDiv: a,
                                                img: e.img,
                                                index: n,
                                                holder: t,
                                                clearPlaceholder: !0
                                            }) : ln(n, e, a, e.img, oe || Qt, !0)
                                        }
                                        e.loadComplete = null, e.img = null, Se("imageLoadComplete", n, e)
                                    }
                                }, f.features.transform) {
                                    var s = "pswp__img pswp__img--placeholder";
                                    s += o.msrc ? "" : " pswp__img--placeholder--blank";
                                    var r = f.createEl(s, o.msrc ? "img" : "");
                                    o.msrc && (r.src = o.msrc), cn(o, r), a.appendChild(r), o.placeholder = r
                                }
                                o.loading || un(o), p.allowProgressiveImg() && (!Zt && H.transform ? nn.push({
                                    item: o,
                                    baseDiv: a,
                                    img: o.img,
                                    index: n,
                                    holder: t
                                }) : ln(n, o, a, o.img, !0, !0))
                            }
                            Zt || n !== g ? Ae(o) : (ie = a.style, en(o, i || o.img)), t.el.innerHTML = "", t.el.appendChild(a)
                        } else t.el.innerHTML = ""
                    },
                    cleanSlide: function (e) {
                        e.img && (e.img.onload = e.img.onerror = null), e.loaded = e.loading = e.img = e.imageAppended = !1
                    }
                }
            });
            var pn, fn, mn = {},
                vn = function (e, t, n) {
                    var i = document.createEvent("CustomEvent"),
                        o = {
                            origEvent: e,
                            target: e.target,
                            releasePoint: t,
                            pointerType: n || "touch"
                        };
                    i.initCustomEvent("pswpTap", !0, !0, o), e.target.dispatchEvent(i)
                };
            ke("Tap", {
                publicMethods: {
                    initTap: function () {
                        Me("firstTouchStart", p.onTapStart), Me("touchRelease", p.onTapRelease), Me("destroy", function () {
                            mn = {}, pn = null
                        })
                    },
                    onTapStart: function (e) {
                        1 < e.length && (clearTimeout(pn), pn = null)
                    },
                    onTapRelease: function (e, t) {
                        if (t && !Z && !U && !Ge) {
                            var n = t;
                            if (pn && (clearTimeout(pn), pn = null, xt(n, mn))) return void Se("doubleTap", n);
                            if ("mouse" === t.type) return void vn(e, t, "mouse");
                            if ("BUTTON" === e.target.tagName.toUpperCase() || f.hasClass(e.target, "pswp__single-tap")) return void vn(e, t);
                            Pe(mn, n), pn = setTimeout(function () {
                                vn(e, t), pn = null
                            }, 300)
                        }
                    }
                }
            }), ke("DesktopZoom", {
                publicMethods: {
                    initDesktopZoom: function () {
                        P || ($ ? Me("mouseUsed", function () {
                            p.setupDesktopZoom()
                        }) : p.setupDesktopZoom(!0))
                    },
                    setupDesktopZoom: function (e) {
                        fn = {};
                        var t = "wheel mousewheel DOMMouseScroll";
                        Me("bindEvents", function () {
                            f.bind(h, t, p.handleMouseWheel)
                        }), Me("unbindEvents", function () {
                            fn && f.unbind(h, t, p.handleMouseWheel)
                        }), p.mouseZoomedIn = !1;
                        var n, i = function () {
                            p.mouseZoomedIn && (f.removeClass(h, "pswp--zoomed-in"), p.mouseZoomedIn = !1), y < 1 ? f.addClass(h, "pswp--zoom-allowed") : f.removeClass(h, "pswp--zoom-allowed"), o()
                        },
                            o = function () {
                                n && (f.removeClass(h, "pswp--dragging"), n = !1)
                            };
                        Me("resize", i), Me("afterChange", i), Me("pointerDown", function () {
                            p.mouseZoomedIn && (n = !0, f.addClass(h, "pswp--dragging"))
                        }), Me("pointerUp", o), e || i()
                    },
                    handleMouseWheel: function (e) {
                        if (y <= p.currItem.fitRatio) return m.modal && (!m.closeOnScroll || Ge || Y ? e.preventDefault() : D && 2 < Math.abs(e.deltaY) && (v = !0, p.close())), !0;
                        if (e.stopPropagation(), fn.x = 0, "deltaX" in e) 1 === e.deltaMode ? (fn.x = 18 * e.deltaX, fn.y = 18 * e.deltaY) : (fn.x = e.deltaX, fn.y = e.deltaY);
                        else if ("wheelDelta" in e) e.wheelDeltaX && (fn.x = -.16 * e.wheelDeltaX), e.wheelDeltaY ? fn.y = -.16 * e.wheelDeltaY : fn.y = -.16 * e.wheelDelta;
                        else {
                            if (!("detail" in e)) return;
                            fn.y = e.detail
                        }
                        qe(y, !0);
                        var t = fe.x - fn.x,
                            n = fe.y - fn.y;
                        (m.modal || t <= ne.min.x && t >= ne.max.x && n <= ne.min.y && n >= ne.max.y) && e.preventDefault(), p.panTo(t, n)
                    },
                    toggleDesktopZoom: function (e) {
                        e = e || {
                            x: me.x / 2 + ge.x,
                            y: me.y / 2 + ge.y
                        };
                        var t = m.getDoubleTapZoom(!0, p.currItem),
                            n = y === t;
                        p.mouseZoomedIn = !n, p.zoomTo(n ? p.currItem.initialZoomLevel : t, e, 333), f[(n ? "remove" : "add") + "Class"](h, "pswp--zoomed-in")
                    }
                }
            });
            var gn, yn, bn, _n, wn, xn, Cn, kn, En, Tn, Mn, Sn, Ln = {
                history: !0,
                galleryUID: 1
            },
                Dn = function () {
                    return Mn.hash.substring(1)
                },
                On = function () {
                    gn && clearTimeout(gn), bn && clearTimeout(bn)
                },
                $n = function () {
                    var e = Dn(),
                        t = {};
                    if (e.length < 5) return t;
                    var n, i = e.split("&");
                    for (n = 0; n < i.length; n++)
                        if (i[n]) {
                            var o = i[n].split("=");
                            o.length < 2 || (t[o[0]] = o[1])
                        }
                    if (m.galleryPIDs) {
                        var a = t.pid;
                        for (n = t.pid = 0; n < Kt.length; n++)
                            if (Kt[n].pid === a) {
                                t.pid = n;
                                break
                            }
                    } else t.pid = parseInt(t.pid, 10) - 1;
                    return t.pid < 0 && (t.pid = 0), t
                },
                An = function () {
                    if (bn && clearTimeout(bn), Ge || Y) bn = setTimeout(An, 500);
                    else {
                        _n ? clearTimeout(yn) : _n = !0;
                        var e = g + 1,
                            t = Gt(g);
                        t.hasOwnProperty("pid") && (e = t.pid);
                        var n = Cn + "&gid=" + m.galleryUID + "&pid=" + e;
                        kn || -1 === Mn.hash.indexOf(n) && (Tn = !0);
                        var i = Mn.href.split("#")[0] + "#" + n;
                        Sn ? "#" + n !== window.location.hash && history[kn ? "replaceState" : "pushState"]("", document.title, i) : kn ? Mn.replace(i) : Mn.hash = n, kn = !0, yn = setTimeout(function () {
                            _n = !1
                        }, 60)
                    }
                };
            ke("History", {
                publicMethods: {
                    initHistory: function () {
                        if (f.extend(m, Ln, !0), m.history) {
                            Mn = window.location, kn = En = Tn = !1, Cn = Dn(), Sn = "pushState" in history, -1 < Cn.indexOf("gid=") && (Cn = (Cn = Cn.split("&gid=")[0]).split("?gid=")[0]), Me("afterChange", p.updateURL), Me("unbindEvents", function () {
                                f.unbind(window, "hashchange", p.onHashChange)
                            });
                            var e = function () {
                                xn = !0, En || (Tn ? history.back() : Cn ? Mn.hash = Cn : Sn ? history.pushState("", document.title, Mn.pathname + Mn.search) : Mn.hash = ""), On()
                            };
                            Me("unbindEvents", function () {
                                v && e()
                            }), Me("destroy", function () {
                                xn || e()
                            }), Me("firstUpdate", function () {
                                g = $n().pid
                            });
                            var t = Cn.indexOf("pid="); - 1 < t && "&" === (Cn = Cn.substring(0, t)).slice(-1) && (Cn = Cn.slice(0, -1)), setTimeout(function () {
                                l && f.bind(window, "hashchange", p.onHashChange)
                            }, 40)
                        }
                    },
                    onHashChange: function () {
                        if (Dn() === Cn) return En = !0, void p.close();
                        _n || (wn = !0, p.goTo($n().pid), wn = !1)
                    },
                    updateURL: function () {
                        On(), wn || (kn ? gn = setTimeout(An, 800) : An())
                    }
                }
            }), f.extend(p, it)
        }
    }),
    function (e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipeUI_Default = t()
    }(this, function () {
        "use strict";
        return function (i, r) {
            var t, l, o, a, n, s, u, d, c, e, h, p, f, m, v, g, y, b, _ = this,
                w = !1,
                x = !0,
                C = !0,
                k = {
                    barsSize: {
                        top: 44,
                        bottom: "auto"
                    },
                    closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                    timeToIdle: 4e3,
                    timeToIdleOutside: 1e3,
                    loadingIndicatorDelay: 1e3,
                    addCaptionHTMLFn: function (e, t) {
                        return e.title ? (t.children[0].innerHTML = e.title, !0) : (t.children[0].innerHTML = "", !1)
                    },
                    closeEl: !0,
                    captionEl: !0,
                    fullscreenEl: !0,
                    zoomEl: !0,
                    shareEl: !0,
                    counterEl: !0,
                    arrowEl: !0,
                    preloaderEl: !0,
                    tapToClose: !1,
                    tapToToggleControls: !0,
                    clickToCloseNonZoomable: !0,
                    shareButtons: [{
                        id: "facebook",
                        label: "Share on Facebook",
                        url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                    }, {
                        id: "twitter",
                        label: "Tweet",
                        url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                    }, {
                        id: "pinterest",
                        label: "Pin it",
                        url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                    }, {
                        id: "download",
                        label: "Download image",
                        url: "{{raw_image_url}}",
                        download: !0
                    }],
                    getImageURLForShare: function () {
                        return i.currItem.src || ""
                    },
                    getPageURLForShare: function () {
                        return window.location.href
                    },
                    getTextForShare: function () {
                        return i.currItem.title || ""
                    },
                    indexIndicatorSep: " / ",
                    fitControlsWidth: 1200
                },
                E = function (e) {
                    if (g) return !0;
                    e = e || window.event, v.timeToIdle && v.mouseUsed && !c && I();
                    for (var t, n, i = (e.target || e.srcElement).getAttribute("class") || "", o = 0; o < q.length; o++)(t = q[o]).onTap && -1 < i.indexOf("pswp__" + t.name) && (t.onTap(), n = !0);
                    if (n) {
                        e.stopPropagation && e.stopPropagation(), g = !0;
                        var a = r.features.isOldAndroid ? 600 : 30;
                        setTimeout(function () {
                            g = !1
                        }, a)
                    }
                },
                T = function () {
                    return !i.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth
                },
                M = function (e, t, n) {
                    r[(n ? "add" : "remove") + "Class"](e, "pswp__" + t)
                },
                S = function () {
                    var e = 1 === v.getNumItemsFn();
                    e !== m && (M(l, "ui--one-slide", e), m = e)
                },
                L = function () {
                    M(u, "share-modal--hidden", C)
                },
                D = function () {
                    return (C = !C) ? (r.removeClass(u, "pswp__share-modal--fade-in"), setTimeout(function () {
                        C && L()
                    }, 300)) : (L(), setTimeout(function () {
                        C || r.addClass(u, "pswp__share-modal--fade-in")
                    }, 30)), C || $(), !1
                },
                O = function (e) {
                    var t = (e = e || window.event).target || e.srcElement;
                    return i.shout("shareLinkClick", e, t), !!t.href && (!!t.hasAttribute("download") || (window.open(t.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), C || D(), !1))
                },
                $ = function () {
                    for (var e, t, n, i, o = "", a = 0; a < v.shareButtons.length; a++) e = v.shareButtons[a], t = v.getImageURLForShare(e), n = v.getPageURLForShare(e), i = v.getTextForShare(e), o += '<a href="' + e.url.replace("{{url}}", encodeURIComponent(n)).replace("{{image_url}}", encodeURIComponent(t)).replace("{{raw_image_url}}", t).replace("{{text}}", encodeURIComponent(i)) + '" target="_blank" class="pswp__share--' + e.id + '"' + (e.download ? "download" : "") + ">" + e.label + "</a>", v.parseShareButtonOut && (o = v.parseShareButtonOut(e, o));
                    u.children[0].innerHTML = o, u.children[0].onclick = O
                },
                A = function (e) {
                    for (var t = 0; t < v.closeElClasses.length; t++)
                        if (r.hasClass(e, "pswp__" + v.closeElClasses[t])) return !0
                },
                B = 0,
                I = function () {
                    clearTimeout(b), B = 0, c && _.setIdle(!1)
                },
                R = function (e) {
                    var t = (e = e || window.event).relatedTarget || e.toElement;
                    t && "HTML" !== t.nodeName || (clearTimeout(b), b = setTimeout(function () {
                        _.setIdle(!0)
                    }, v.timeToIdleOutside))
                },
                P = function () {
                    v.fullscreenEl && !r.features.isOldAndroid && (t || (t = _.getFullscreenAPI()), t ? (r.bind(document, t.eventK, _.updateFullscreen), _.updateFullscreen(), r.addClass(i.template, "pswp--supports-fs")) : r.removeClass(i.template, "pswp--supports-fs"))
                },
                N = function () {
                    v.preloaderEl && (H(!0), e("beforeChange", function () {
                        clearTimeout(f), f = setTimeout(function () {
                            i.currItem && i.currItem.loading ? (!i.allowProgressiveImg() || i.currItem.img && !i.currItem.img.naturalWidth) && H(!1) : H(!0)
                        }, v.loadingIndicatorDelay)
                    }), e("imageLoadComplete", function (e, t) {
                        i.currItem === t && H(!0)
                    }))
                },
                H = function (e) {
                    p !== e && (M(h, "preloader--active", !e), p = e)
                },
                F = function (e) {
                    var t = e.vGap;
                    if (T()) {
                        var n = v.barsSize;
                        if (v.captionEl && "auto" === n.bottom)
                            if (a || ((a = r.createEl("pswp__caption pswp__caption--fake")).appendChild(r.createEl("pswp__caption__center")), l.insertBefore(a, o), r.addClass(l, "pswp__ui--fit")), v.addCaptionHTMLFn(e, a, !0)) {
                                var i = a.clientHeight;
                                t.bottom = parseInt(i, 10) || 44
                            } else t.bottom = n.top;
                        else t.bottom = "auto" === n.bottom ? 0 : n.bottom;
                        t.top = n.top
                    } else t.top = t.bottom = 0
                },
                j = function () {
                    v.timeToIdle && e("mouseUsed", function () {
                        r.bind(document, "mousemove", I), r.bind(document, "mouseout", R), y = setInterval(function () {
                            2 === ++B && _.setIdle(!0)
                        }, v.timeToIdle / 2)
                    })
                },
                W = function () {
                    var t;
                    e("onVerticalDrag", function (e) {
                        x && e < .95 ? _.hideControls() : !x && .95 <= e && _.showControls()
                    }), e("onPinchClose", function (e) {
                        x && e < .9 ? (_.hideControls(), t = !0) : t && !x && .9 < e && _.showControls()
                    }), e("zoomGestureEnded", function () {
                        (t = !1) && !x && _.showControls()
                    })
                },
                q = [{
                    name: "caption",
                    option: "captionEl",
                    onInit: function (e) {
                        o = e
                    }
                }, {
                    name: "share-modal",
                    option: "shareEl",
                    onInit: function (e) {
                        u = e
                    },
                    onTap: function () {
                        D()
                    }
                }, {
                    name: "button--share",
                    option: "shareEl",
                    onInit: function (e) {
                        s = e
                    },
                    onTap: function () {
                        D()
                    }
                }, {
                    name: "button--zoom",
                    option: "zoomEl",
                    onTap: i.toggleDesktopZoom
                }, {
                    name: "counter",
                    option: "counterEl",
                    onInit: function (e) {
                        n = e
                    }
                }, {
                    name: "button--close",
                    option: "closeEl",
                    onTap: i.close
                }, {
                    name: "button--arrow--left",
                    option: "arrowEl",
                    onTap: i.prev
                }, {
                    name: "button--arrow--right",
                    option: "arrowEl",
                    onTap: i.next
                }, {
                    name: "button--fs",
                    option: "fullscreenEl",
                    onTap: function () {
                        t.isFullscreen() ? t.exit() : t.enter()
                    }
                }, {
                    name: "preloader",
                    option: "preloaderEl",
                    onInit: function (e) {
                        h = e
                    }
                }],
                z = function () {
                    var o, a, s, e = function (e) {
                        if (e)
                            for (var t = e.length, n = 0; n < t; n++) {
                                o = e[n], a = o.className;
                                for (var i = 0; i < q.length; i++) s = q[i], -1 < a.indexOf("pswp__" + s.name) && (v[s.option] ? (r.removeClass(o, "pswp__element--disabled"), s.onInit && s.onInit(o)) : r.addClass(o, "pswp__element--disabled"))
                            }
                    };
                    e(l.children);
                    var t = r.getChildByClass(l, "pswp__top-bar");
                    t && e(t.children)
                };
            _.init = function () {
                r.extend(i.options, k, !0), v = i.options, l = r.getChildByClass(i.scrollWrap, "pswp__ui"), e = i.listen, W(), e("beforeChange", _.update), e("doubleTap", function (e) {
                    var t = i.currItem.initialZoomLevel;
                    i.getZoomLevel() !== t ? i.zoomTo(t, e, 333) : i.zoomTo(v.getDoubleTapZoom(!1, i.currItem), e, 333)
                }), e("preventDragEvent", function (e, t, n) {
                    var i = e.target || e.srcElement;
                    i && i.getAttribute("class") && -1 < e.type.indexOf("mouse") && (0 < i.getAttribute("class").indexOf("__caption") || /(SMALL|STRONG|EM)/i.test(i.tagName)) && (n.prevent = !1)
                }), e("bindEvents", function () {
                    r.bind(l, "pswpTap click", E), r.bind(i.scrollWrap, "pswpTap", _.onGlobalTap), i.likelyTouchDevice || r.bind(i.scrollWrap, "mouseover", _.onMouseOver)
                }), e("unbindEvents", function () {
                    C || D(), y && clearInterval(y), r.unbind(document, "mouseout", R), r.unbind(document, "mousemove", I), r.unbind(l, "pswpTap click", E), r.unbind(i.scrollWrap, "pswpTap", _.onGlobalTap), r.unbind(i.scrollWrap, "mouseover", _.onMouseOver), t && (r.unbind(document, t.eventK, _.updateFullscreen), t.isFullscreen() && (v.hideAnimationDuration = 0, t.exit()), t = null)
                }), e("destroy", function () {
                    v.captionEl && (a && l.removeChild(a), r.removeClass(o, "pswp__caption--empty")), u && (u.children[0].onclick = null), r.removeClass(l, "pswp__ui--over-close"), r.addClass(l, "pswp__ui--hidden"), _.setIdle(!1)
                }), v.showAnimationDuration || r.removeClass(l, "pswp__ui--hidden"), e("initialZoomIn", function () {
                    v.showAnimationDuration && r.removeClass(l, "pswp__ui--hidden")
                }), e("initialZoomOut", function () {
                    r.addClass(l, "pswp__ui--hidden")
                }), e("parseVerticalMargin", F), z(), v.shareEl && s && u && (C = !0), S(), j(), P(), N()
            }, _.setIdle = function (e) {
                M(l, "ui--idle", c = e)
            }, _.update = function () {
                x && i.currItem ? (_.updateIndexIndicator(), v.captionEl && (v.addCaptionHTMLFn(i.currItem, o), M(o, "caption--empty", !i.currItem.title)), w = !0) : w = !1, C || D(), S()
            }, _.updateFullscreen = function (e) {
                e && setTimeout(function () {
                    i.setScrollOffset(0, r.getScrollY())
                }, 50), r[(t.isFullscreen() ? "add" : "remove") + "Class"](i.template, "pswp--fs")
            }, _.updateIndexIndicator = function () {
                v.counterEl && (n.innerHTML = i.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn())
            }, _.onGlobalTap = function (e) {
                var t = (e = e || window.event).target || e.srcElement;
                if (!g)
                    if (e.detail && "mouse" === e.detail.pointerType) {
                        if (A(t)) return void i.close();
                        r.hasClass(t, "pswp__img") && (1 === i.getZoomLevel() && i.getZoomLevel() <= i.currItem.fitRatio ? v.clickToCloseNonZoomable && i.close() : i.toggleDesktopZoom(e.detail.releasePoint))
                    } else if (v.tapToToggleControls && (x ? _.hideControls() : _.showControls()), v.tapToClose && (r.hasClass(t, "pswp__img") || A(t))) return void i.close()
            }, _.onMouseOver = function (e) {
                var t = (e = e || window.event).target || e.srcElement;
                M(l, "ui--over-close", A(t))
            }, _.hideControls = function () {
                r.addClass(l, "pswp__ui--hidden"), x = !1
            }, _.showControls = function () {
                x = !0, w || _.update(), r.removeClass(l, "pswp__ui--hidden")
            }, _.supportsFullscreen = function () {
                var e = document;
                return !!(e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen)
            }, _.getFullscreenAPI = function () {
                var e, t = document.documentElement,
                    n = "fullscreenchange";
                return t.requestFullscreen ? e = {
                    enterK: "requestFullscreen",
                    exitK: "exitFullscreen",
                    elementK: "fullscreenElement",
                    eventK: n
                } : t.mozRequestFullScreen ? e = {
                    enterK: "mozRequestFullScreen",
                    exitK: "mozCancelFullScreen",
                    elementK: "mozFullScreenElement",
                    eventK: "moz" + n
                } : t.webkitRequestFullscreen ? e = {
                    enterK: "webkitRequestFullscreen",
                    exitK: "webkitExitFullscreen",
                    elementK: "webkitFullscreenElement",
                    eventK: "webkit" + n
                } : t.msRequestFullscreen && (e = {
                    enterK: "msRequestFullscreen",
                    exitK: "msExitFullscreen",
                    elementK: "msFullscreenElement",
                    eventK: "MSFullscreenChange"
                }), e && (e.enter = function () {
                    if (d = v.closeOnScroll, v.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK) return i.template[this.enterK]();
                    i.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
                }, e.exit = function () {
                    return v.closeOnScroll = d, document[this.exitK]()
                }, e.isFullscreen = function () {
                    return document[this.elementK]
                }), e
            }
        }
    }),
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (c) {
        c.extend(c.fn, {
            validate: function (e) {
                if (this.length) {
                    var i = c.data(this[0], "validator");
                    return i || (this.attr("novalidate", "novalidate"), i = new c.validator(e, this[0]), c.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function (e) {
                        i.submitButton = e.currentTarget, c(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== c(this).attr("formnovalidate") && (i.cancelSubmit = !0)
                    }), this.on("submit.validate", function (n) {
                        function e() {
                            var e, t;
                            return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (e = c("<input type='hidden'/>").attr("name", i.submitButton.name).val(c(i.submitButton).val()).appendTo(i.currentForm)), !i.settings.submitHandler || (t = i.settings.submitHandler.call(i, i.currentForm, n), e && e.remove(), void 0 !== t && t)
                        }
                        return i.settings.debug && n.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, e()) : i.form() ? i.pendingRequest ? !(i.formSubmitted = !0) : e() : (i.focusInvalid(), !1)
                    })), i)
                }
                e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
            },
            valid: function () {
                var e, t, n;
                return c(this[0]).is("form") ? e = this.validate().form() : (n = [], e = !0, t = c(this[0].form).validate(), this.each(function () {
                    (e = t.element(this) && e) || (n = n.concat(t.errorList))
                }), t.errorList = n), e
            },
            rules: function (e, t) {
                var n, i, o, a, s, r, l = this[0];
                if (null != l && (!l.form && l.hasAttribute("contenteditable") && (l.form = this.closest("form")[0], l.name = this.attr("name")), null != l.form)) {
                    if (e) switch (n = c.data(l.form, "validator").settings, i = n.rules, o = c.validator.staticRules(l), e) {
                        case "add":
                            c.extend(o, c.validator.normalizeRule(t)), delete o.messages, i[l.name] = o, t.messages && (n.messages[l.name] = c.extend(n.messages[l.name], t.messages));
                            break;
                        case "remove":
                            return t ? (r = {}, c.each(t.split(/\s/), function (e, t) {
                                r[t] = o[t], delete o[t]
                            }), r) : (delete i[l.name], o)
                    }
                    return (a = c.validator.normalizeRules(c.extend({}, c.validator.classRules(l), c.validator.attributeRules(l), c.validator.dataRules(l), c.validator.staticRules(l)), l)).required && (s = a.required, delete a.required, a = c.extend({
                        required: s
                    }, a)), a.remote && (s = a.remote, delete a.remote, a = c.extend(a, {
                        remote: s
                    })), a
                }
            }
        }), c.extend(c.expr.pseudos || c.expr[":"], {
            blank: function (e) {
                return !c.trim("" + c(e).val())
            },
            filled: function (e) {
                var t = c(e).val();
                return null !== t && !!c.trim("" + t)
            },
            unchecked: function (e) {
                return !c(e).prop("checked")
            }
        }), c.validator = function (e, t) {
            this.settings = c.extend(!0, {}, c.validator.defaults, e), this.currentForm = t, this.init()
        }, c.validator.format = function (n, e) {
            return 1 === arguments.length ? function () {
                var e = c.makeArray(arguments);
                return e.unshift(n), c.validator.format.apply(this, e)
            } : (void 0 === e || (2 < arguments.length && e.constructor !== Array && (e = c.makeArray(arguments).slice(1)), e.constructor !== Array && (e = [e]), c.each(e, function (e, t) {
                n = n.replace(new RegExp("\\{" + e + "\\}", "g"), function () {
                    return t
                })
            })), n)
        }, c.extend(c.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                pendingClass: "pending",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: !1,
                focusInvalid: !0,
                errorContainer: c([]),
                errorLabelContainer: c([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (e) {
                    this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
                },
                onfocusout: function (e) {
                    this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
                },
                onkeyup: function (e, t) {
                    var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                    9 === t.which && "" === this.elementValue(e) || -1 !== c.inArray(t.keyCode, n) || (e.name in this.submitted || e.name in this.invalid) && this.element(e)
                },
                onclick: function (e) {
                    e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
                },
                highlight: function (e, t, n) {
                    "radio" === e.type ? this.findByName(e.name).addClass(t).removeClass(n) : c(e).addClass(t).removeClass(n)
                },
                unhighlight: function (e, t, n) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(t).addClass(n) : c(e).removeClass(t).addClass(n)
                }
            },
            setDefaults: function (e) {
                c.extend(c.validator.defaults, e)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                equalTo: "Please enter the same value again.",
                maxlength: c.validator.format("Please enter no more than {0} characters."),
                minlength: c.validator.format("Please enter at least {0} characters."),
                rangelength: c.validator.format("Please enter a value between {0} and {1} characters long."),
                range: c.validator.format("Please enter a value between {0} and {1}."),
                max: c.validator.format("Please enter a value less than or equal to {0}."),
                min: c.validator.format("Please enter a value greater than or equal to {0}."),
                step: c.validator.format("Please enter a multiple of {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function e(e) {
                        !this.form && this.hasAttribute("contenteditable") && (this.form = c(this).closest("form")[0], this.name = c(this).attr("name"));
                        var t = c.data(this.form, "validator"),
                            n = "on" + e.type.replace(/^validate/, ""),
                            i = t.settings;
                        i[n] && !c(this).is(i.ignore) && i[n].call(t, this, e)
                    }
                    this.labelContainer = c(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || c(this.currentForm), this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var n, i = this.groups = {};
                    c.each(this.settings.groups, function (n, e) {
                        "string" == typeof e && (e = e.split(/\s/)), c.each(e, function (e, t) {
                            i[t] = n
                        })
                    }), n = this.settings.rules, c.each(n, function (e, t) {
                        n[e] = c.validator.normalizeRule(t)
                    }), c(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", e).on("click.validate", "select, option, [type='radio'], [type='checkbox']", e), this.settings.invalidHandler && c(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function () {
                    return this.checkForm(), c.extend(this.submitted, this.errorMap), this.invalid = c.extend({}, this.errorMap), this.valid() || c(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                    return this.valid()
                },
                element: function (e) {
                    var t, n, i = this.clean(e),
                        o = this.validationTargetFor(i),
                        a = this,
                        s = !0;
                    return void 0 === o ? delete this.invalid[i.name] : (this.prepareElement(o), this.currentElements = c(o), (n = this.groups[o.name]) && c.each(this.groups, function (e, t) {
                        t === n && e !== o.name && ((i = a.validationTargetFor(a.clean(a.findByName(e)))) && i.name in a.invalid && (a.currentElements.push(i), s = a.check(i) && s))
                    }), t = !1 !== this.check(o), s = s && t, this.invalid[o.name] = !t, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), c(e).attr("aria-invalid", !t)), s
                },
                showErrors: function (t) {
                    if (t) {
                        var n = this;
                        c.extend(this.errorMap, t), this.errorList = c.map(this.errorMap, function (e, t) {
                            return {
                                message: e,
                                element: n.findByName(t)[0]
                            }
                        }), this.successList = c.grep(this.successList, function (e) {
                            return !(e.name in t)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function () {
                    c.fn.resetForm && c(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                    var e = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                    this.resetElements(e)
                },
                resetElements: function (e) {
                    var t;
                    if (this.settings.unhighlight)
                        for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                    else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                },
                objectLength: function (e) {
                    var t, n = 0;
                    for (t in e) void 0 !== e[t] && null !== e[t] && !1 !== e[t] && n++;
                    return n
                },
                hideErrors: function () {
                    this.hideThese(this.toHide)
                },
                hideThese: function (e) {
                    e.not(this.containers).text(""), this.addWrapper(e).hide()
                },
                valid: function () {
                    return 0 === this.size()
                },
                size: function () {
                    return this.errorList.length
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        c(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (i) { }
                },
                findLastActive: function () {
                    var t = this.lastActive;
                    return t && 1 === c.grep(this.errorList, function (e) {
                        return e.element.name === t.name
                    }).length && t
                },
                elements: function () {
                    var t = this,
                        n = {};
                    return c(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                        var e = this.name || c(this).attr("name");
                        return !e && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = c(this).closest("form")[0], this.name = e), !(e in n || !t.objectLength(c(this).rules()) || (n[e] = !0, 0))
                    })
                },
                clean: function (e) {
                    return c(e)[0]
                },
                errors: function () {
                    var e = this.settings.errorClass.split(" ").join(".");
                    return c(this.settings.errorElement + "." + e, this.errorContext)
                },
                resetInternals: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = c([]), this.toHide = c([])
                },
                reset: function () {
                    this.resetInternals(), this.currentElements = c([])
                },
                prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function (e) {
                    this.reset(), this.toHide = this.errorsFor(e)
                },
                elementValue: function (e) {
                    var t, n, i = c(e),
                        o = e.type;
                    return "radio" === o || "checkbox" === o ? this.findByName(e.name).filter(":checked").val() : "number" === o && "undefined" != typeof e.validity ? e.validity.badInput ? "NaN" : i.val() : (t = e.hasAttribute("contenteditable") ? i.text() : i.val(), "file" === o ? "C:\\fakepath\\" === t.substr(0, 12) ? t.substr(12) : 0 <= (n = t.lastIndexOf("/")) ? t.substr(n + 1) : 0 <= (n = t.lastIndexOf("\\")) ? t.substr(n + 1) : t : "string" == typeof t ? t.replace(/\r/g, "") : t)
                },
                check: function (e) {
                    e = this.validationTargetFor(this.clean(e));
                    var t, n, i, o, a = c(e).rules(),
                        s = c.map(a, function (e, t) {
                            return t
                        }).length,
                        r = !1,
                        l = this.elementValue(e);
                    if ("function" == typeof a.normalizer ? o = a.normalizer : "function" == typeof this.settings.normalizer && (o = this.settings.normalizer), o) {
                        if ("string" != typeof (l = o.call(e, l))) throw new TypeError("The normalizer should return a string value.");
                        delete a.normalizer
                    }
                    for (n in a) {
                        i = {
                            method: n,
                            parameters: a[n]
                        };
                        try {
                            if ("dependency-mismatch" === (t = c.validator.methods[n].call(this, l, e, i.parameters)) && 1 === s) {
                                r = !0;
                                continue
                            }
                            if (r = !1, "pending" === t) return void (this.toHide = this.toHide.not(this.errorsFor(e)));
                            if (!t) return this.formatAndAdd(e, i), !1
                        } catch (u) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + i.method + "' method.", u), u instanceof TypeError && (u.message += ".  Exception occurred when checking element " + e.id + ", check the '" + i.method + "' method."), u
                        }
                    }
                    if (!r) return this.objectLength(a) && this.successList.push(e), !0
                },
                customDataMessage: function (e, t) {
                    return c(e).data("msg" + t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()) || c(e).data("msg")
                },
                customMessage: function (e, t) {
                    var n = this.settings.messages[e];
                    return n && (n.constructor === String ? n : n[t])
                },
                findDefined: function () {
                    for (var e = 0; e < arguments.length; e++)
                        if (void 0 !== arguments[e]) return arguments[e]
                },
                defaultMessage: function (e, t) {
                    "string" == typeof t && (t = {
                        method: t
                    });
                    var n = this.findDefined(this.customMessage(e.name, t.method), this.customDataMessage(e, t.method), !this.settings.ignoreTitle && e.title || void 0, c.validator.messages[t.method], "<strong>Warning: No message defined for " + e.name + "</strong>"),
                        i = /\$?\{(\d+)\}/g;
                    return "function" == typeof n ? n = n.call(this, t.parameters, e) : i.test(n) && (n = c.validator.format(n.replace(i, "{$1}"), t.parameters)), n
                },
                formatAndAdd: function (e, t) {
                    var n = this.defaultMessage(e, t);
                    this.errorList.push({
                        message: n,
                        element: e,
                        method: t.method
                    }), this.errorMap[e.name] = n, this.submitted[e.name] = n
                },
                addWrapper: function (e) {
                    return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
                },
                defaultShowErrors: function () {
                    var e, t, n;
                    for (e = 0; this.errorList[e]; e++) n = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                    if (this.settings.unhighlight)
                        for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function () {
                    return c(this.errorList).map(function () {
                        return this.element
                    })
                },
                showLabel: function (e, t) {
                    var n, i, o, a, s = this.errorsFor(e),
                        r = this.idOrName(e),
                        l = c(e).attr("aria-describedby");
                    s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(t)) : (n = s = c("<" + this.settings.errorElement + ">").attr("id", r + "-error").addClass(this.settings.errorClass).html(t || ""), this.settings.wrapper && (n = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, n, c(e)) : n.insertAfter(e), s.is("label") ? s.attr("for", r) : 0 === s.parents("label[for='" + this.escapeCssMeta(r) + "']").length && (o = s.attr("id"), l ? l.match(new RegExp("\\b" + this.escapeCssMeta(o) + "\\b")) || (l += " " + o) : l = o, c(e).attr("aria-describedby", l), (i = this.groups[e.name]) && (a = this, c.each(a.groups, function (e, t) {
                        t === i && c("[name='" + a.escapeCssMeta(e) + "']", a.currentForm).attr("aria-describedby", s.attr("id"))
                    })))), !t && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
                },
                errorsFor: function (e) {
                    var t = this.escapeCssMeta(this.idOrName(e)),
                        n = c(e).attr("aria-describedby"),
                        i = "label[for='" + t + "'], label[for='" + t + "'] *";
                    return n && (i = i + ", #" + this.escapeCssMeta(n).replace(/\s+/g, ", #")), this.errors().filter(i)
                },
                escapeCssMeta: function (e) {
                    return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
                },
                idOrName: function (e) {
                    return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
                },
                validationTargetFor: function (e) {
                    return this.checkable(e) && (e = this.findByName(e.name)), c(e).not(this.settings.ignore)[0]
                },
                checkable: function (e) {
                    return /radio|checkbox/i.test(e.type)
                },
                findByName: function (e) {
                    return c(this.currentForm).find("[name='" + this.escapeCssMeta(e) + "']")
                },
                getLength: function (e, t) {
                    switch (t.nodeName.toLowerCase()) {
                        case "select":
                            return c("option:selected", t).length;
                        case "input":
                            if (this.checkable(t)) return this.findByName(t.name).filter(":checked").length
                    }
                    return e.length
                },
                depend: function (e, t) {
                    return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
                },
                dependTypes: {
                    "boolean": function (e) {
                        return e
                    },
                    string: function (e, t) {
                        return !!c(e, t.form).length
                    },
                    "function": function (e, t) {
                        return e(t)
                    }
                },
                optional: function (e) {
                    var t = this.elementValue(e);
                    return !c.validator.methods.required.call(this, t, e) && "dependency-mismatch"
                },
                startRequest: function (e) {
                    this.pending[e.name] || (this.pendingRequest++ , c(e).addClass(this.settings.pendingClass), this.pending[e.name] = !0)
                },
                stopRequest: function (e, t) {
                    this.pendingRequest-- , this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], c(e).removeClass(this.settings.pendingClass), t && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (c(this.currentForm).submit(), this.submitButton && c("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !t && 0 === this.pendingRequest && this.formSubmitted && (c(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function (e, t) {
                    return t = "string" == typeof t && t || "remote", c.data(e, "previousValue") || c.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, {
                            method: t
                        })
                    })
                },
                destroy: function () {
                    this.resetForm(), c(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function (e, t) {
                e.constructor === String ? this.classRuleSettings[e] = t : c.extend(this.classRuleSettings, e)
            },
            classRules: function (e) {
                var t = {},
                    n = c(e).attr("class");
                return n && c.each(n.split(" "), function () {
                    this in c.validator.classRuleSettings && c.extend(t, c.validator.classRuleSettings[this])
                }), t
            },
            normalizeAttributeRule: function (e, t, n, i) {
                /min|max|step/.test(n) && (null === t || /number|range|text/.test(t)) && (i = Number(i), isNaN(i) && (i = void 0)), i || 0 === i ? e[n] = i : t === n && "range" !== t && (e[n] = !0)
            },
            attributeRules: function (e) {
                var t, n, i = {},
                    o = c(e),
                    a = e.getAttribute("type");
                for (t in c.validator.methods) "required" === t ? ("" === (n = e.getAttribute(t)) && (n = !0), n = !!n) : n = o.attr(t), this.normalizeAttributeRule(i, a, t, n);
                return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
            },
            dataRules: function (e) {
                var t, n, i = {},
                    o = c(e),
                    a = e.getAttribute("type");
                for (t in c.validator.methods) n = o.data("rule" + t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()), this.normalizeAttributeRule(i, a, t, n);
                return i
            },
            staticRules: function (e) {
                var t = {},
                    n = c.data(e.form, "validator");
                return n.settings.rules && (t = c.validator.normalizeRule(n.settings.rules[e.name]) || {}), t
            },
            normalizeRules: function (i, o) {
                return c.each(i, function (e, t) {
                    if (!1 !== t) {
                        if (t.param || t.depends) {
                            var n = !0;
                            switch (typeof t.depends) {
                                case "string":
                                    n = !!c(t.depends, o.form).length;
                                    break;
                                case "function":
                                    n = t.depends.call(o, o)
                            }
                            n ? i[e] = void 0 === t.param || t.param : (c.data(o.form, "validator").resetElements(c(o)), delete i[e])
                        }
                    } else delete i[e]
                }), c.each(i, function (e, t) {
                    i[e] = c.isFunction(t) && "normalizer" !== e ? t(o) : t
                }), c.each(["minlength", "maxlength"], function () {
                    i[this] && (i[this] = Number(i[this]))
                }), c.each(["rangelength", "range"], function () {
                    var e;
                    i[this] && (c.isArray(i[this]) ? i[this] = [Number(i[this][0]), Number(i[this][1])] : "string" == typeof i[this] && (e = i[this].replace(/[\[\]]/g, "").split(/[\s,]+/), i[this] = [Number(e[0]), Number(e[1])]))
                }), c.validator.autoCreateRanges && (null != i.min && null != i.max && (i.range = [i.min, i.max], delete i.min, delete i.max), null != i.minlength && null != i.maxlength && (i.rangelength = [i.minlength, i.maxlength], delete i.minlength, delete i.maxlength)), i
            },
            normalizeRule: function (e) {
                if ("string" == typeof e) {
                    var t = {};
                    c.each(e.split(/\s/), function () {
                        t[this] = !0
                    }), e = t
                }
                return e
            },
            addMethod: function (e, t, n) {
                c.validator.methods[e] = t, c.validator.messages[e] = void 0 !== n ? n : c.validator.messages[e], t.length < 3 && c.validator.addClassRules(e, c.validator.normalizeRule(e))
            },
            methods: {
                required: function (e, t, n) {
                    if (!this.depend(n, t)) return "dependency-mismatch";
                    if ("select" === t.nodeName.toLowerCase()) {
                        var i = c(t).val();
                        return i && 0 < i.length
                    }
                    return this.checkable(t) ? 0 < this.getLength(e, t) : 0 < e.length
                },
                email: function (e, t) {
                    return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
                },
                url: function (e, t) {
                    return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)
                },
                date: function (e, t) {
                    return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
                },
                dateISO: function (e, t) {
                    return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
                },
                number: function (e, t) {
                    return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
                },
                digits: function (e, t) {
                    return this.optional(t) || /^\d+$/.test(e)
                },
                minlength: function (e, t, n) {
                    var i = c.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || n <= i
                },
                maxlength: function (e, t, n) {
                    var i = c.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || i <= n
                },
                rangelength: function (e, t, n) {
                    var i = c.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || i >= n[0] && i <= n[1]
                },
                min: function (e, t, n) {
                    return this.optional(t) || n <= e
                },
                max: function (e, t, n) {
                    return this.optional(t) || e <= n
                },
                range: function (e, t, n) {
                    return this.optional(t) || e >= n[0] && e <= n[1]
                },
                step: function (e, t, n) {
                    var i, o = c(t).attr("type"),
                        a = "Step attribute on input type " + o + " is not supported.",
                        s = ["text", "number", "range"],
                        r = new RegExp("\\b" + o + "\\b"),
                        l = function (e) {
                            var t = ("" + e).match(/(?:\.(\d+))?$/);
                            return t && t[1] ? t[1].length : 0
                        },
                        u = function (e) {
                            return Math.round(e * Math.pow(10, i))
                        },
                        d = !0;
                    if (o && !r.test(s.join())) throw new Error(a);
                    return i = l(n), (l(e) > i || u(e) % u(n) != 0) && (d = !1), this.optional(t) || d
                },
                equalTo: function (e, t, n) {
                    var i = c(n);
                    return this.settings.onfocusout && i.not(".validate-equalTo-blur").length && i.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                        c(t).valid()
                    }), e === i.val()
                },
                remote: function (a, s, e, r) {
                    if (this.optional(s)) return "dependency-mismatch";
                    r = "string" == typeof r && r || "remote";
                    var l, t, n, u = this.previousValue(s, r);
                    return this.settings.messages[s.name] || (this.settings.messages[s.name] = {}), u.originalMessage = u.originalMessage || this.settings.messages[s.name][r], this.settings.messages[s.name][r] = u.message, e = "string" == typeof e && {
                        url: e
                    } || e, n = c.param(c.extend({
                        data: a
                    }, e.data)), u.old === n ? u.valid : (u.old = n, (l = this).startRequest(s), (t = {})[s.name] = a, c.ajax(c.extend(!0, {
                        mode: "abort",
                        port: "validate" + s.name,
                        dataType: "json",
                        data: t,
                        context: l.currentForm,
                        success: function (e) {
                            var t, n, i, o = !0 === e || "true" === e;
                            l.settings.messages[s.name][r] = u.originalMessage, o ? (i = l.formSubmitted, l.resetInternals(), l.toHide = l.errorsFor(s), l.formSubmitted = i, l.successList.push(s), l.invalid[s.name] = !1, l.showErrors()) : (t = {}, n = e || l.defaultMessage(s, {
                                method: r,
                                parameters: a
                            }), t[s.name] = u.message = n, l.invalid[s.name] = !0, l.showErrors(t)), u.valid = o, l.stopRequest(s, o)
                        }
                    }, e)), "pending")
                }
            }
        });
        var i, o = {};
        return c.ajaxPrefilter ? c.ajaxPrefilter(function (e, t, n) {
            var i = e.port;
            "abort" === e.mode && (o[i] && o[i].abort(), o[i] = n)
        }) : (i = c.ajax, c.ajax = function (e) {
            var t = ("mode" in e ? e : c.ajaxSettings).mode,
                n = ("port" in e ? e : c.ajaxSettings).port;
            return "abort" === t ? (o[n] && o[n].abort(), o[n] = i.apply(this, arguments), o[n]) : i.apply(this, arguments)
        }), c
    });
var MStepper = function () {
    function m(e, t) {
        var b = this,
            n = 1 < arguments.length && void 0 !== t ? t : {};
        _classCallCheck(this, m), _defineProperty(this, "_init", function () {
            var e = b._formWrapperManager,
                t = b.getSteps,
                n = b.options,
                i = b._methodsBindingManager,
                o = b._openAction,
                a = t().steps;
            b.form = e(), o(a[n.firstActive], void 0, void 0, !0), i(a)
        }), _defineProperty(this, "_methodsBindingManager", function (e, t) {
            var n = 1 < arguments.length && void 0 !== t && t,
                s = b.classes,
                r = b._formSubmitHandler,
                l = b._nextStepProxy,
                u = b._prevStepProxy,
                d = b._stepTitleClickHandler,
                c = b.form,
                h = b.options,
                i = m.nodesIterator,
                p = m.tabbingDisabler,
                f = n ? m.removeMultipleEventListeners : m.addMultipleEventListeners,
                o = function (e) {
                    var t = e.getElementsByClassName(s.NEXTSTEPBTN),
                        n = e.getElementsByClassName(s.PREVSTEPBTN),
                        i = e.getElementsByClassName(s.STEPTITLE),
                        o = e.querySelectorAll("input, select, textarea, button"),
                        a = e.querySelectorAll('button[type="submit"]');
                    return f(t,
                        "click", l, !1), f(n, "click", u, !1), h.stepTitleNavigation && f(i, "click", d), o.length && f(o[o.length - 1], "keydown", p), a && c && h.validationFunction && f(a, "keydown", r), e
                };
            e instanceof Element ? o(e) : i(e, function (e) {
                return o(e)
            })
        }), _defineProperty(this, "_formSubmitHandler", function (e) {
            b._validationFunctionCaller() || e.preventDefault()
        }), _defineProperty(this, "resetStepper", function () {
            b.form && (b.form.reset(), b.openStep(b.options.firstActive))
        }), _defineProperty(this, "_openAction", function (e, t, n, i) {
            var o = !(2 < arguments.length && void 0 !== n) || n,
                a = 3 < arguments.length ? i : void 0,
                s = b._slideDown,
                r = b.classes,
                l = b.getSteps,
                u = b._closeAction,
                d = b.stepper,
                c = b.events,
                h = b.options,
                p = l().active.step;
            if (p && p.isSameNode(e)) return e;
            var f = e.getElementsByClassName(r.STEPCONTENT)[0];
            return e.classList.remove(r.DONESTEP), window.innerWidth < 993 || !d.classList.contains(r.HORIZONTALSTEPPER) ? (s(f, r.ACTIVESTEP, e, t), a || s(f, r.ACTIVESTEP, e, function () {
                var e = f.querySelector("input, select, textarea");
                h.autoFocusInput && e && e.focus(), t && "function" == typeof t && t()
            })) : e.classList.add(r.ACTIVESTEP), p && o && (u(p), d.dispatchEvent(c.STEPCHANGE)), d.dispatchEvent(c.STEPOPEN), e
        }), _defineProperty(this, "_closeAction", function (t, n) {
            var i = b._slideUp,
                o = b.classes,
                a = b.stepper,
                s = b.events,
                r = b._smartListenerUnbind,
                l = b._smartListenerBind,
                u = t.getElementsByClassName(o.STEPCONTENT)[0];
            return window.innerWidth < 993 || !a.classList.contains(o.HORIZONTALSTEPPER) ? i(u, o.ACTIVESTEP, t, n) : (n && l(u, "transitionend", function e(t) {
                "left" === t.propertyName && (r(u, "transitionend", e), n())
            }), t.classList.remove(o.ACTIVESTEP)), a.dispatchEvent(s.STEPCLOSE), t
        }), _defineProperty(this, "_nextStepProxy", function (e) {
            return b.nextStep(void 0, void 0, e)
        }), _defineProperty(this, "_prevStepProxy", function (e) {
            return b.prevStep(void 0, e)
        }), _defineProperty(this, "_stepTitleClickHandler", function (e) {
            var t = b.getSteps,
                n = b.classes,
                i = b.nextStep,
                o = b.prevStep,
                a = b.stepper,
                s = b._openAction,
                r = t(),
                l = r.steps,
                u = r.active,
                d = e.target.closest(".".concat(n.STEP));
            if (a.classList.contains(n.LINEAR)) {
                var c = Array.prototype.indexOf.call(l, d);
                c == u.index + 1 ? i() : c == u.index - 1 && o()
            } else s(d)
        }), _defineProperty(this, "nextStep", function (e, t, n) {
            n && n.preventDefault && n.preventDefault();
            var i = b.options,
                o = b.getSteps,
                a = b.activateFeedback,
                s = b.form,
                r = b.wrongStep,
                l = b.classes,
                u = b._openAction,
                d = b.stepper,
                c = b.events,
                h = b.destroyFeedback,
                p = b._validationFunctionCaller,
                f = i.showFeedbackPreloader,
                m = i.validationFunction,
                v = o().active,
                g = o().steps[v.index + 1],
                y = n && n.target ? n.target.dataset.feedback : null;
            return m && !p() ? r() : y && !t ? (f && !v.step.dataset.nopreloader && a(), void window[y](h, s, v.step.querySelector(".".concat(l.STEPCONTENT)))) : (v.step.classList.add(l.DONESTEP), u(g, e), void d.dispatchEvent(c.NEXTSTEP))
        }), _defineProperty(this, "prevStep", function (e, t) {
            t && t.preventDefault && t.preventDefault();
            var n = b.getSteps,
                i = b._openAction,
                o = b.stepper,
                a = b.events,
                s = b.destroyFeedback,
                r = n().active,
                l = n().steps[r.index + -1];
            s(), i(l, e), o.dispatchEvent(a.PREVSTEP)
        }), _defineProperty(this, "openStep", function (e, t) {
            var n = b.getSteps,
                i = b._openAction,
                o = b.destroyFeedback,
                a = n().steps[e];
            o(), i(a, t)
        }), _defineProperty(this, "wrongStep", function () {
            var t = b.getSteps,
                n = b.classes,
                i = b.stepper,
                o = b.events;
            t().active.step.classList.add(n.WRONGSTEP);
            var a = t().active.step.querySelectorAll("input, select, textarea");
            m.addMultipleEventListeners(a, "input", function e() {
                t().active.step.classList.remove(n.WRONGSTEP), m.removeMultipleEventListeners(a, "input", e)
            }), i.dispatchEvent(o.STEPERROR)
        }), _defineProperty(this, "activateFeedback", function () {
            var e = b.getSteps,
                t = b.classes,
                n = b.options,
                i = b.stepper,
                o = b.events,
                a = e().active.step;
            a.classList.add(t.FEEDBACKINGSTEP), a.getElementsByClassName(t.STEPCONTENT)[0].insertAdjacentHTML("afterBegin", '<div class="'.concat(t.PRELOADERWRAPPER, '">').concat(n.feedbackPreloader, "</div>")), i.dispatchEvent(o.FEEDBACKING)
        }), _defineProperty(this, "destroyFeedback", function (e) {
            var t = b.getSteps,
                n = b.classes,
                i = b.nextStep,
                o = b.stepper,
                a = b.events,
                s = t().active.step;
            if (s && s.classList.contains(n.FEEDBACKINGSTEP)) {
                s.classList.remove(n.FEEDBACKINGSTEP);
                var r = s.getElementsByClassName(n.PRELOADERWRAPPER)[0];
                r.parentNode.removeChild(r), e && i(void 0, !0), o.dispatchEvent(a.FEEDBACKDESTROYED)
            }
        }), _defineProperty(this, "getSteps", function () {
            var e = b.stepper,
                t = b.classes,
                n = e.children,
                i = e.querySelector("li.".concat(t.STEP, ".").concat(t.ACTIVESTEP));
            return {
                steps: n,
                active: {
                    step: i,
                    index: Array.prototype.indexOf.call(n, i)
                }
            }
        }), _defineProperty(this, "activateStep", function (e, t) {
            var n = b.getSteps,
                i = b._slideDown,
                o = b.stepper,
                a = b._methodsBindingManager,
                s = m.nodesIterator,
                r = n().steps,
                l = r.length > t,
                u = l ? r[t] : r[r.length - 1],
                d = null;
            if ("string" == typeof e) u.insertAdjacentHTML(l ? "beforeBegin" : "afterEnd", e.trim()), d = l ? u.previousSibling : u.nextSibling, i(d);
            else if (Array.isArray(e)) d = [], e.forEach(function (e) {
                u.insertAdjacentHTML(l ? "beforeBegin" : "afterEnd", e.trim());
                var t = l ? u.previousSibling : u.nextSibling;
                d.push(t), i(t)
            });
            else if (e instanceof Element || e instanceof HTMLCollection || e instanceof NodeList) {
                var c = l ? o.insertBefore : o.appendChild;
                d = c(e, u), e instanceof Element ? i(d) : s(d, function (e) {
                    return i(e)
                })
            }
            return d && a(d), d
        }), _defineProperty(this, "deactivateStep", function (t) {
            var n = b._slideUp,
                i = b.stepper,
                o = b._methodsBindingManager,
                e = m.nodesIterator,
                a = function (e) {
                    i.contains(t) && (o(e, !0), n(e, void 0, void 0, function () {
                        return i.removeChild(e)
                    }))
                };
            return t instanceof Element ? a(t) : (t instanceof HTMLCollection || t instanceof NodeList) && e(t, function (e) {
                return a(e)
            }), t
        }), _defineProperty(this, "_slideDown", function (n, t, i, o) {
            var a = 2 < arguments.length && void 0 !== i ? i : n,
                s = 3 < arguments.length ? o : void 0,
                r = "".concat(m.getUnknownHeight(n), "px"),
                l = function e(t) {
                    "height" === t.propertyName && (b._smartListenerUnbind(n, "transitionend", e), m.removeMultipleProperties(n, "visibility overflow height display"), s && s())
                };
            return requestAnimationFrame(function () {
                n.style.display = "none", requestAnimationFrame(function () {
                    n.style.overflow = "hidden", n.style.height = "0", n.style.paddingBottom = "0", n.style.visibility = "unset", n.style.display = "block", requestAnimationFrame(function () {
                        b._smartListenerBind(n, "transitionend", l), n.style.height = r, n.style.removeProperty("padding-bottom"), t && a.classList.add(t)
                    })
                })
            }), n
        }), _defineProperty(this, "_slideUp", function (n, t, i, o) {
            var a = 2 < arguments.length && void 0 !== i ? i : n,
                s = 3 < arguments.length ? o : void 0,
                r = "".concat(n.offsetHeight, "px"),
                l = function e(t) {
                    "height" === t.propertyName && (b._smartListenerUnbind(n, "transitionend", e), n.style.display = "none", m.removeMultipleProperties(n, "visibility overflow height padding-bottom"), s && s())
                };
            return requestAnimationFrame(function () {
                n.style.overflow = "hidden", n.style.visibility = "unset", n.style.display = "block", n.style.height = r, requestAnimationFrame(function () {
                    b._smartListenerBind(n, "transitionend", l), n.style.height = "0", n.style.paddingBottom = "0", t && a.classList.remove(t)
                })
            }), n
        }), _defineProperty(this, "_formWrapperManager", function () {
            var e = b.stepper,
                t = b.options,
                n = e.closest("form");
            if (n || !t.autoFormCreation) return n.length ? n : null;
            var i = e.dataset || {},
                o = i.method || "GET",
                a = i.action || "?",
                s = document.createElement("form");
            return s.method = o, s.action = a, e.parentNode.insertBefore(s, e), s.appendChild(e), s
        }), _defineProperty(this, "_validationFunctionCaller", function () {
            var e = b.options,
                t = b.getSteps,
                n = b.form,
                i = b.classes;
            return e.validationFunction(n, t().active.step.querySelector(".".concat(i.STEPCONTENT)))
        }), _defineProperty(this, "_smartListenerBind", function (e, t, n, i, o) {
            var a = !(3 < arguments.length && void 0 !== i) || i,
                s = 4 < arguments.length && void 0 !== o && o,
                r = b.listenerStore,
                l = {
                    el: e,
                    event: t,
                    fn: n
                };
            if (a)
                for (var u = 0; u < r.length; u++) {
                    var d = r[u];
                    d.event === t && d.el.isSameNode(e) && d.el.removeEventListener(d.event, d.fn), s && d.fn()
                } else {
                var c = r.indexOf(l);
                if (-1 !== h) {
                    var h = r[c];
                    h.el.removeEventListener(h.event, h.fn), s && h[c].fn()
                }
            }
            e.addEventListener(t, n), r.push(l)
        }), _defineProperty(this, "_smartListenerUnbind", function (e, t, n) {
            var i = b.listenerStore,
                o = i.indexOf({
                    el: e,
                    event: t,
                    fn: n
                });
            e.removeEventListener(t, n), i.splice(o, 1)
        }), this.stepper = e, this.options = Object.assign({
            firstActive: 0,
            autoFocusInput: !0,
            showFeedbackPreloader: !0,
            autoFormCreation: !0,
            validationFunction: m.defaultValidationFunction,
            stepTitleNavigation: !0,
            feedbackPreloader: '<div class="preloader-wrapper active"> <div class="spinner-layer spinner-blue-only"> <div class="circle-clipper left"> <div class="circle"></div></div><div class="gap-patch"> <div class="circle"></div></div><div class="circle-clipper right"> <div class="circle"></div></div></div></div>'
        }, n), this.classes = {
            HORIZONTALSTEPPER: "horizontal",
            LINEAR: "linear",
            NEXTSTEPBTN: "next-step",
            PREVSTEPBTN: "previous-step",
            STEPTITLE: "step-title",
            STEP: "step",
            STEPCONTENT: "step-content",
            PRELOADERWRAPPER: "wait-feedback",
            FEEDBACKINGSTEP: "feedbacking",
            ACTIVESTEP: "active",
            WRONGSTEP: "wrong",
            DONESTEP: "done"
        }, this.events = {
            STEPCHANGE: new Event("stepchange"),
            STEPOPEN: new Event("stepopen"),
            STEPCLOSE: new Event("stepclose"),
            NEXTSTEP: new Event("nextstep"),
            PREVSTEP: new Event("prevstep"),
            STEPERROR: new Event("steperror"),
            FEEDBACKING: new Event("feedbacking"),
            FEEDBACKDESTROYED: new Event("feedbackdestroyed")
        }, this.listenerStore = [], this.form = null, this._init()
    }
    return _createClass(m, null, [{
        key: "addMultipleEventListeners",
        value: function (e, t, n, i) {
            var o = 3 < arguments.length && void 0 !== i && i;
            if (e instanceof Element) return e.addEventListener(t, n, o);
            for (var a = 0, s = e.length; a < s; a++) e[a].addEventListener(t, n, o)
        }
    }, {
        key: "removeMultipleEventListeners",
        value: function (e, t, n, i) {
            var o = 3 < arguments.length && void 0 !== i && i;
            if (e instanceof Element) return e.removeEventListener(t, n, o);
            for (var a = 0, s = e.length; a < s; a++) e[a].removeEventListener(t, n, o)
        }
    }, {
        key: "removeMultipleProperties",
        value: function (e, t) {
            for (var n = t.split(" "), i = 0; i < n.length; i++) e.style.removeProperty(n[i])
        }
    }, {
        key: "nodesIterator",
        value: function (e, t) {
            for (var n = 0; n < e.length; n++) t(e[n]);
            return e
        }
    }, {
        key: "getUnknownHeight",
        value: function (e) {
            e.style.position = "fixed", e.style.display = "block", e.style.top = "-999999px", e.style.left = "-999999px", e.style.height = "auto", e.style.opacity = "0", e.style.zIndex = "-999999", e.style.pointerEvents = "none";
            var t = e.offsetHeight;
            return m.removeMultipleProperties(e, "position display top left height opacity z-index pointer-events"), t
        }
    }, {
        key: "defaultValidationFunction",
        value: function (e, t) {
            for (var n = t.querySelectorAll("input, textarea, select"), i = 0; i < n.length; i++)
                if (!n[i].checkValidity()) return !1;
            return !0
        }
    }, {
        key: "tabbingDisabler",
        value: function (e) {
            9 === e.keyCode && e.preventDefault()
        }
    }]), m
}();
window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
    var t, n = (this.document || this.ownerDocument).querySelectorAll(e),
        i = this;
    do {
        for (t = n.length; 0 <= --t && n.item(t) !== i;);
    } while (t < 0 && (i = i.parentElement));
    return i
}), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
    value: function (e) {
        if (null == e) throw new TypeError("Cannot convert undefined or null to object");
        for (var t = Object(e), n = 1; n < arguments.length; n++) {
            var i = arguments[n];
            if (null != i)
                for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
        }
        return t
    },
    writable: !0,
    configurable: !0
}), $(crop);
var initPhotoSwipeFromDOM = function (t) {
    for (var l = function (e) {
        for (var t, n, i, o, a = e.childNodes, s = a.length, r = [], l = 0; l < s; l++) 1 === (t = a[l]).nodeType && (i = (n = t.children[0]).getAttribute("data-size").split("x"), o = {
            src: n.getAttribute("href"),
            w: parseInt(i[0], 10),
            h: parseInt(i[1], 10)
        }, 1 < t.children.length && (o.title = t.children[1].innerHTML), 0 < n.children.length && (o.msrc = n.children[0].getAttribute("src")), o.el = t, r.push(o));
        return r
    }, u = function e(t, n) {
        return t && (n(t) ? t : e(t.parentNode, n))
    }, n = function (e) {
        (e = e || window.event).preventDefault ? e.preventDefault() : e.returnValue = !1;
        var t = e.target || e.srcElement,
            n = u(t, function (e) {
                return e.tagName && "FIGURE" === e.tagName.toUpperCase()
            });
        if (n) {
            for (var i, o = n.parentNode, a = n.parentNode.childNodes, s = a.length, r = 0, l = 0; l < s; l++)
                if (1 === a[l].nodeType) {
                    if (a[l] === n) {
                        i = r;
                        break
                    }
                    r++
                }
            return 0 <= i && d(i, o), !1
        }
    }, i = function () {
        var e = window.location.hash.substring(1),
            t = {};
        if (e.length < 5) return t;
        for (var n = e.split("&"), i = 0; i < n.length; i++)
            if (n[i]) {
                var o = n[i].split("=");
                o.length < 2 || (t[o[0]] = o[1])
            }
        return t.gid && (t.gid = parseInt(t.gid, 10)), t
    }, d = function (e, t, n, i) {
        var o, a, s = document.querySelectorAll(".pswp")[0];
        if (a = l(t), o = {
            galleryUID: t.getAttribute("data-pswp-uid"),
            history: !1,
            getThumbBoundsFn: function (e) {
                var t = a[e].el.getElementsByTagName("img")[0],
                    n = window.pageYOffset || document.documentElement.scrollTop,
                    i = t.getBoundingClientRect();
                return {
                    x: i.left,
                    y: i.top + n,
                    w: i.width
                }
            }
        }, i)
            if (o.galleryPIDs) {
                for (var r = 0; r < a.length; r++)
                    if (a[r].pid == e) {
                        o.index = r;
                        break
                    }
            } else o.index = parseInt(e, 10) - 1;
        else o.index = parseInt(e, 10);
        isNaN(o.index) || (n && (o.showAnimationDuration = 0), new PhotoSwipe(s, PhotoSwipeUI_Default, a, o).init())
    }, o = document.querySelectorAll(t), a = 0, s = o.length; a < s; a++) o[a].setAttribute("data-pswp-uid", a + 1), o[a].onclick = n;
    var r = i();
    r.pid && r.gid && d(r.pid, o[r.gid - 1], !0, !0)
};
$(function () {
    initPhotoSwipeFromDOM(".my-gallery")
}),
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (d) {
        d.extend(d.fn, {
            validate: function (e) {
                if (this.length) {
                    var i = d.data(this[0], "validator");
                    return i || (this.attr("novalidate", "novalidate"), i = new d.validator(e, this[0]), d.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function (e) {
                        i.settings.submitHandler && (i.submitButton = e.target), d(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== d(this).attr("formnovalidate") && (i.cancelSubmit = !0)
                    }), this.on("submit.validate", function (n) {
                        function e() {
                            var e, t;
                            return !i.settings.submitHandler || (i.submitButton && (e = d("<input type='hidden'/>").attr("name", i.submitButton.name).val(d(i.submitButton).val()).appendTo(i.currentForm)), t = i.settings.submitHandler.call(i, i.currentForm, n), i.submitButton && e.remove(), void 0 !== t && t)
                        }
                        return i.settings.debug && n.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, e()) : i.form() ? i.pendingRequest ? !(i.formSubmitted = !0) : e() : (i.focusInvalid(), !1)
                    })), i)
                }
                e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
            },
            valid: function () {
                var e, t, n;
                return d(this[0]).is("form") ? e = this.validate().form() : (n = [], e = !0, t = d(this[0].form).validate(), this.each(function () {
                    (e = t.element(this) && e) || (n = n.concat(t.errorList))
                }), t.errorList = n), e
            },
            rules: function (e, t) {
                if (this.length) {
                    var n, i, o, a, s, r, l = this[0];
                    if (e) switch (n = d.data(l.form, "validator").settings, i = n.rules, o = d.validator.staticRules(l), e) {
                        case "add":
                            d.extend(o, d.validator.normalizeRule(t)), delete o.messages, i[l.name] = o, t.messages && (n.messages[l.name] = d.extend(n.messages[l.name], t.messages));
                            break;
                        case "remove":
                            return t ? (r = {}, d.each(t.split(/\s/), function (e, t) {
                                r[t] = o[t], delete o[t], "required" === t && d(l).removeAttr("aria-required")
                            }), r) : (delete i[l.name], o)
                    }
                    return (a = d.validator.normalizeRules(d.extend({}, d.validator.classRules(l), d.validator.attributeRules(l), d.validator.dataRules(l), d.validator.staticRules(l)), l)).required && (s = a.required, delete a.required, a = d.extend({
                        required: s
                    }, a), d(l).attr("aria-required", "true")), a.remote && (s = a.remote, delete a.remote, a = d.extend(a, {
                        remote: s
                    })), a
                }
            }
        }), d.extend(d.expr[":"], {
            blank: function (e) {
                return !d.trim("" + d(e).val())
            },
            filled: function (e) {
                var t = d(e).val();
                return null !== t && !!d.trim("" + t)
            },
            unchecked: function (e) {
                return !d(e).prop("checked")
            }
        }), d.validator = function (e, t) {
            this.settings = d.extend(!0, {}, d.validator.defaults, e), this.currentForm = t, this.init()
        }, d.validator.format = function (n, e) {
            return 1 === arguments.length ? function () {
                var e = d.makeArray(arguments);
                return e.unshift(n), d.validator.format.apply(this, e)
            } : (void 0 === e || (2 < arguments.length && e.constructor !== Array && (e = d.makeArray(arguments).slice(1)), e.constructor !== Array && (e = [e]), d.each(e, function (e, t) {
                n = n.replace(new RegExp("\\{" + e + "\\}", "g"), function () {
                    return t
                })
            })), n)
        }, d.extend(d.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                pendingClass: "pending",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: !1,
                focusInvalid: !0,
                errorContainer: d([]),
                errorLabelContainer: d([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (e) {
                    this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
                },
                onfocusout: function (e) {
                    this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
                },
                onkeyup: function (e, t) {
                    var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                    9 === t.which && "" === this.elementValue(e) || -1 !== d.inArray(t.keyCode, n) || (e.name in this.submitted || e.name in this.invalid) && this.element(e)
                },
                onclick: function (e) {
                    e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
                },
                highlight: function (e, t, n) {
                    "radio" === e.type ? this.findByName(e.name).addClass(t).removeClass(n) : d(e).addClass(t).removeClass(n)
                },
                unhighlight: function (e, t, n) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(t).addClass(n) : d(e).removeClass(t).addClass(n)
                }
            },
            setDefaults: function (e) {
                d.extend(d.validator.defaults, e)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date ( ISO ).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                equalTo: "Please enter the same value again.",
                maxlength: d.validator.format("Please enter no more than {0} characters."),
                minlength: d.validator.format("Please enter at least {0} characters."),
                rangelength: d.validator.format("Please enter a value between {0} and {1} characters long."),
                range: d.validator.format("Please enter a value between {0} and {1}."),
                max: d.validator.format("Please enter a value less than or equal to {0}."),
                min: d.validator.format("Please enter a value greater than or equal to {0}."),
                step: d.validator.format("Please enter a multiple of {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function e(e) {
                        var t = d.data(this.form, "validator"),
                            n = "on" + e.type.replace(/^validate/, ""),
                            i = t.settings;
                        i[n] && !d(this).is(i.ignore) && i[n].call(t, this, e)
                    }
                    this.labelContainer = d(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || d(this.currentForm), this.containers = d(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var n, i = this.groups = {};
                    d.each(this.settings.groups, function (n, e) {
                        "string" == typeof e && (e = e.split(/\s/)), d.each(e, function (e, t) {
                            i[t] = n
                        })
                    }), n = this.settings.rules, d.each(n, function (e, t) {
                        n[e] = d.validator.normalizeRule(t)
                    }), d(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", e).on("click.validate", "select, option, [type='radio'], [type='checkbox']", e), this.settings.invalidHandler && d(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), d(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                },
                form: function () {
                    return this.checkForm(), d.extend(this.submitted, this.errorMap), this.invalid = d.extend({}, this.errorMap), this.valid() || d(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                    return this.valid()
                },
                element: function (e) {
                    var t, n, i = this.clean(e),
                        o = this.validationTargetFor(i),
                        a = this,
                        s = !0;
                    return void 0 === o ? delete this.invalid[i.name] : (this.prepareElement(o), this.currentElements = d(o), (n = this.groups[o.name]) && d.each(this.groups, function (e, t) {
                        t === n && e !== o.name && ((i = a.validationTargetFor(a.clean(a.findByName(e)))) && i.name in a.invalid && (a.currentElements.push(i), s = s && a.check(i)))
                    }), t = !1 !== this.check(o), s = s && t, this.invalid[o.name] = !t, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), d(e).attr("aria-invalid", !t)), s
                },
                showErrors: function (t) {
                    if (t) {
                        var n = this;
                        d.extend(this.errorMap, t), this.errorList = d.map(this.errorMap, function (e, t) {
                            return {
                                message: e,
                                element: n.findByName(t)[0]
                            }
                        }), this.successList = d.grep(this.successList, function (e) {
                            return !(e.name in t)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function () {
                    d.fn.resetForm && d(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                    var e = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                    this.resetElements(e)
                },
                resetElements: function (e) {
                    var t;
                    if (this.settings.unhighlight)
                        for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                    else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                },
                objectLength: function (e) {
                    var t, n = 0;
                    for (t in e) e[t] && n++;
                    return n
                },
                hideErrors: function () {
                    this.hideThese(this.toHide)
                },
                hideThese: function (e) {
                    e.not(this.containers).text(""), this.addWrapper(e).hide()
                },
                valid: function () {
                    return 0 === this.size()
                },
                size: function () {
                    return this.errorList.length
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        d(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (i) { }
                },
                findLastActive: function () {
                    var t = this.lastActive;
                    return t && 1 === d.grep(this.errorList, function (e) {
                        return e.element.name === t.name
                    }).length && t
                },
                elements: function () {
                    var t = this,
                        n = {};
                    return d(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                        var e = this.name || d(this).attr("name");
                        return !e && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = d(this).closest("form")[0]), !(e in n || !t.objectLength(d(this).rules())) && (n[e] = !0)
                    })
                },
                clean: function (e) {
                    return d(e)[0]
                },
                errors: function () {
                    var e = this.settings.errorClass.split(" ").join(".");
                    return d(this.settings.errorElement + "." + e, this.errorContext)
                },
                resetInternals: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = d([]), this.toHide = d([])
                },
                reset: function () {
                    this.resetInternals(), this.currentElements = d([])
                },
                prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function (e) {
                    this.reset(), this.toHide = this.errorsFor(e)
                },
                elementValue: function (e) {
                    var t, n, i = d(e),
                        o = e.type;
                    return "radio" === o || "checkbox" === o ? this.findByName(e.name).filter(":checked").val() : "number" === o && "undefined" != typeof e.validity ? e.validity.badInput ? "NaN" : i.val() : (t = e.hasAttribute("contenteditable") ? i.text() : i.val(), "file" === o ? "C:\\fakepath\\" === t.substr(0, 12) ? t.substr(12) : 0 <= (n = t.lastIndexOf("/")) ? t.substr(n + 1) : 0 <= (n = t.lastIndexOf("\\")) ? t.substr(n + 1) : t : "string" == typeof t ? t.replace(/\r/g, "") : t)
                },
                check: function (e) {
                    e = this.validationTargetFor(this.clean(e));
                    var t, n, i, o = d(e).rules(),
                        a = d.map(o, function (e, t) {
                            return t
                        }).length,
                        s = !1,
                        r = this.elementValue(e);
                    if ("function" == typeof o.normalizer) {
                        if ("string" != typeof (r = o.normalizer.call(e, r))) throw new TypeError("The normalizer should return a string value.");
                        delete o.normalizer
                    }
                    for (n in o) {
                        i = {
                            method: n,
                            parameters: o[n]
                        };
                        try {
                            if ("dependency-mismatch" === (t = d.validator.methods[n].call(this, r, e, i.parameters)) && 1 === a) {
                                s = !0;
                                continue
                            }
                            if (s = !1, "pending" === t) return void (this.toHide = this.toHide.not(this.errorsFor(e)));
                            if (!t) return this.formatAndAdd(e, i), !1
                        } catch (l) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + i.method + "' method.", l), l instanceof TypeError && (l.message += ".  Exception occurred when checking element " + e.id + ", check the '" + i.method + "' method."), l
                        }
                    }
                    if (!s) return this.objectLength(o) && this.successList.push(e), !0
                },
                customDataMessage: function (e, t) {
                    return d(e).data("msg" + t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()) || d(e).data("msg")
                },
                customMessage: function (e, t) {
                    var n = this.settings.messages[e];
                    return n && (n.constructor === String ? n : n[t])
                },
                findDefined: function () {
                    for (var e = 0; e < arguments.length; e++)
                        if (void 0 !== arguments[e]) return arguments[e]
                },
                defaultMessage: function (e, t) {
                    var n = this.findDefined(this.customMessage(e.name, t.method), this.customDataMessage(e, t.method), !this.settings.ignoreTitle && e.title || void 0, d.validator.messages[t.method], "<strong>Warning: No message defined for " + e.name + "</strong>"),
                        i = /\$?\{(\d+)\}/g;
                    return "function" == typeof n ? n = n.call(this, t.parameters, e) : i.test(n) && (n = d.validator.format(n.replace(i, "{$1}"), t.parameters)), n
                },
                formatAndAdd: function (e, t) {
                    var n = this.defaultMessage(e, t);
                    this.errorList.push({
                        message: n,
                        element: e,
                        method: t.method
                    }), this.errorMap[e.name] = n, this.submitted[e.name] = n
                },
                addWrapper: function (e) {
                    return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
                },
                defaultShowErrors: function () {
                    var e, t, n;
                    for (e = 0; this.errorList[e]; e++) n = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                    if (this.settings.unhighlight)
                        for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function () {
                    return d(this.errorList).map(function () {
                        return this.element
                    })
                },
                showLabel: function (e, t) {
                    var n, i, o, a, s = this.errorsFor(e),
                        r = this.idOrName(e),
                        l = d(e).attr("aria-describedby");
                    s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(t)) : (n = s = d("<" + this.settings.errorElement + ">").attr("id", r + "-error").addClass(this.settings.errorClass).html(t || ""), this.settings.wrapper && (n = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement(n, d(e)) : n.insertAfter(e), s.is("label") ? s.attr("for", r) : 0 === s.parents("label[for='" + this.escapeCssMeta(r) + "']").length && (o = s.attr("id"), l ? l.match(new RegExp("\\b" + this.escapeCssMeta(o) + "\\b")) || (l += " " + o) : l = o, d(e).attr("aria-describedby", l), (i = this.groups[e.name]) && (a = this, d.each(a.groups, function (e, t) {
                        t === i && d("[name='" + a.escapeCssMeta(e) + "']", a.currentForm).attr("aria-describedby", s.attr("id"))
                    })))), !t && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
                },
                errorsFor: function (e) {
                    var t = this.escapeCssMeta(this.idOrName(e)),
                        n = d(e).attr("aria-describedby"),
                        i = "label[for='" + t + "'], label[for='" + t + "'] *";
                    return n && (i = i + ", #" + this.escapeCssMeta(n).replace(/\s+/g, ", #")), this.errors().filter(i)
                },
                escapeCssMeta: function (e) {
                    return e.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
                },
                idOrName: function (e) {
                    return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
                },
                validationTargetFor: function (e) {
                    return this.checkable(e) && (e = this.findByName(e.name)), d(e).not(this.settings.ignore)[0]
                },
                checkable: function (e) {
                    return /radio|checkbox/i.test(e.type)
                },
                findByName: function (e) {
                    return d(this.currentForm).find("[name='" + this.escapeCssMeta(e) + "']")
                },
                getLength: function (e, t) {
                    switch (t.nodeName.toLowerCase()) {
                        case "select":
                            return d("option:selected", t).length;
                        case "input":
                            if (this.checkable(t)) return this.findByName(t.name).filter(":checked").length
                    }
                    return e.length
                },
                depend: function (e, t) {
                    return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
                },
                dependTypes: {
                    "boolean": function (e) {
                        return e
                    },
                    string: function (e, t) {
                        return !!d(e, t.form).length
                    },
                    "function": function (e, t) {
                        return e(t)
                    }
                },
                optional: function (e) {
                    var t = this.elementValue(e);
                    return !d.validator.methods.required.call(this, t, e) && "dependency-mismatch"
                },
                startRequest: function (e) {
                    this.pending[e.name] || (this.pendingRequest++ , d(e).addClass(this.settings.pendingClass), this.pending[e.name] = !0)
                },
                stopRequest: function (e, t) {
                    this.pendingRequest-- , this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], d(e).removeClass(this.settings.pendingClass), t && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (d(this.currentForm).submit(), this.formSubmitted = !1) : !t && 0 === this.pendingRequest && this.formSubmitted && (d(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function (e, t) {
                    return d.data(e, "previousValue") || d.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, {
                            method: t
                        })
                    })
                },
                destroy: function () {
                    this.resetForm(), d(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function (e, t) {
                e.constructor === String ? this.classRuleSettings[e] = t : d.extend(this.classRuleSettings, e)
            },
            classRules: function (e) {
                var t = {},
                    n = d(e).attr("class");
                return n && d.each(n.split(" "), function () {
                    this in d.validator.classRuleSettings && d.extend(t, d.validator.classRuleSettings[this])
                }), t
            },
            normalizeAttributeRule: function (e, t, n, i) {
                /min|max|step/.test(n) && (null === t || /number|range|text/.test(t)) && (i = Number(i), isNaN(i) && (i = void 0)), i || 0 === i ? e[n] = i : t === n && "range" !== t && (e[n] = !0)
            },
            attributeRules: function (e) {
                var t, n, i = {},
                    o = d(e),
                    a = e.getAttribute("type");
                for (t in d.validator.methods) "required" === t ? ("" === (n = e.getAttribute(t)) && (n = !0), n = !!n) : n = o.attr(t), this.normalizeAttributeRule(i, a, t, n);
                return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
            },
            dataRules: function (e) {
                var t, n, i = {},
                    o = d(e),
                    a = e.getAttribute("type");
                for (t in d.validator.methods) n = o.data("rule" + t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()), this.normalizeAttributeRule(i, a, t, n);
                return i
            },
            staticRules: function (e) {
                var t = {},
                    n = d.data(e.form, "validator");
                return n.settings.rules && (t = d.validator.normalizeRule(n.settings.rules[e.name]) || {}), t
            },
            normalizeRules: function (i, o) {
                return d.each(i, function (e, t) {
                    if (!1 !== t) {
                        if (t.param || t.depends) {
                            var n = !0;
                            switch (typeof t.depends) {
                                case "string":
                                    n = !!d(t.depends, o.form).length;
                                    break;
                                case "function":
                                    n = t.depends.call(o, o)
                            }
                            n ? i[e] = void 0 === t.param || t.param : (d.data(o.form, "validator").resetElements(d(o)), delete i[e])
                        }
                    } else delete i[e]
                }), d.each(i, function (e, t) {
                    i[e] = d.isFunction(t) && "normalizer" !== e ? t(o) : t
                }), d.each(["minlength", "maxlength"], function () {
                    i[this] && (i[this] = Number(i[this]))
                }), d.each(["rangelength", "range"], function () {
                    var e;
                    i[this] && (d.isArray(i[this]) ? i[this] = [Number(i[this][0]), Number(i[this][1])] : "string" == typeof i[this] && (e = i[this].replace(/[\[\]]/g, "").split(/[\s,]+/), i[this] = [Number(e[0]), Number(e[1])]))
                }), d.validator.autoCreateRanges && (null != i.min && null != i.max && (i.range = [i.min, i.max], delete i.min, delete i.max), null != i.minlength && null != i.maxlength && (i.rangelength = [i.minlength, i.maxlength], delete i.minlength, delete i.maxlength)), i
            },
            normalizeRule: function (e) {
                if ("string" == typeof e) {
                    var t = {};
                    d.each(e.split(/\s/), function () {
                        t[this] = !0
                    }), e = t
                }
                return e
            },
            addMethod: function (e, t, n) {
                d.validator.methods[e] = t, d.validator.messages[e] = void 0 !== n ? n : d.validator.messages[e], t.length < 3 && d.validator.addClassRules(e, d.validator.normalizeRule(e))
            },
            methods: {
                required: function (e, t, n) {
                    if (!this.depend(n, t)) return "dependency-mismatch";
                    if ("select" === t.nodeName.toLowerCase()) {
                        var i = d(t).val();
                        return i && 0 < i.length
                    }
                    return this.checkable(t) ? 0 < this.getLength(e, t) : 0 < e.length
                },
                email: function (e, t) {
                    return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
                },
                url: function (e, t) {
                    return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
                },
                date: function (e, t) {
                    return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
                },
                dateISO: function (e, t) {
                    return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
                },
                number: function (e, t) {
                    return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
                },
                digits: function (e, t) {
                    return this.optional(t) || /^\d+$/.test(e)
                },
                minlength: function (e, t, n) {
                    var i = d.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || n <= i
                },
                maxlength: function (e, t, n) {
                    var i = d.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || i <= n
                },
                rangelength: function (e, t, n) {
                    var i = d.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || i >= n[0] && i <= n[1]
                },
                min: function (e, t, n) {
                    return this.optional(t) || n <= e
                },
                max: function (e, t, n) {
                    return this.optional(t) || e <= n
                },
                range: function (e, t, n) {
                    return this.optional(t) || e >= n[0] && e <= n[1]
                },
                step: function (e, t, n) {
                    var i = d(t).attr("type"),
                        o = "Step attribute on input type " + i + " is not supported.",
                        a = ["text", "number", "range"],
                        s = new RegExp("\\b" + i + "\\b");
                    if (i && !s.test(a.join())) throw new Error(o);
                    return this.optional(t) || e % n == 0
                },
                equalTo: function (e, t, n) {
                    var i = d(n);
                    return this.settings.onfocusout && i.not(".validate-equalTo-blur").length && i.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                        d(t).valid()
                    }), e === i.val()
                },
                remote: function (a, s, e, r) {
                    if (this.optional(s)) return "dependency-mismatch";
                    r = "string" == typeof r && r || "remote";
                    var l, t, n, u = this.previousValue(s, r);
                    return this.settings.messages[s.name] || (this.settings.messages[s.name] = {}), u.originalMessage = u.originalMessage || this.settings.messages[s.name][r], this.settings.messages[s.name][r] = u.message, e = "string" == typeof e && {
                        url: e
                    } || e, n = d.param(d.extend({
                        data: a
                    }, e.data)), u.old === n ? u.valid : (u.old = n, (l = this).startRequest(s), (t = {})[s.name] = a, d.ajax(d.extend(!0, {
                        mode: "abort",
                        port: "validate" + s.name,
                        dataType: "json",
                        data: t,
                        context: l.currentForm,
                        success: function (e) {
                            var t, n, i, o = !0 === e || "true" === e;
                            l.settings.messages[s.name][r] = u.originalMessage, o ? (i = l.formSubmitted, l.resetInternals(), l.toHide = l.errorsFor(s), l.formSubmitted = i, l.successList.push(s), l.invalid[s.name] = !1, l.showErrors()) : (t = {}, n = e || l.defaultMessage(s, {
                                method: r,
                                parameters: a
                            }), t[s.name] = u.message = n, l.invalid[s.name] = !0, l.showErrors(t)), u.valid = o, l.stopRequest(s, o)
                        }
                    }, e)), "pending")
                }
            }
        });
        var i, o = {};
        d.ajaxPrefilter ? d.ajaxPrefilter(function (e, t, n) {
            var i = e.port;
            "abort" === e.mode && (o[i] && o[i].abort(), o[i] = n)
        }) : (i = d.ajax, d.ajax = function (e) {
            var t = ("mode" in e ? e : d.ajaxSettings).mode,
                n = ("port" in e ? e : d.ajaxSettings).port;
            return "abort" === t ? (o[n] && o[n].abort(), o[n] = i.apply(this, arguments), o[n]) : i.apply(this, arguments)
        })
    }),
    function (e) {
        var t = !1;
        if ("function" == typeof define && define.amd && (define(e), t = !0), "object" == typeof exports && (module.exports = e(), t = !0), !t) {
            var n = window.Cookies,
                i = window.Cookies = e();
            i.noConflict = function () {
                return window.Cookies = n, i
            }
        }
    }(function () {
        function v() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) t[i] = n[i]
            }
            return t
        }

        function e(f) {
            function m(e, t, n) {
                var i;
                if ("undefined" != typeof document) {
                    if (1 < arguments.length) {
                        if ("number" == typeof (n = v({
                            path: "/"
                        }, m.defaults, n)).expires) {
                            var o = new Date;
                            o.setMilliseconds(o.getMilliseconds() + 864e5 * n.expires), n.expires = o
                        }
                        n.expires = n.expires ? n.expires.toUTCString() : "";
                        try {
                            i = JSON.stringify(t), /^[\{\[]/.test(i) && (t = i)
                        } catch (p) { }
                        t = f.write ? f.write(t, e) : encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = (e = (e = encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                        var a = "";
                        for (var s in n) n[s] && (a += "; " + s, !0 !== n[s] && (a += "=" + n[s]));
                        return document.cookie = e + "=" + t + a
                    }
                    e || (i = {});
                    for (var r = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, u = 0; u < r.length; u++) {
                        var d = r[u].split("="),
                            c = d.slice(1).join("=");
                        this.json || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                        try {
                            var h = d[0].replace(l, decodeURIComponent);
                            if (c = f.read ? f.read(c, h) : f(c, h) || c.replace(l, decodeURIComponent), this.json) try {
                                c = JSON.parse(c)
                            } catch (p) { }
                            if (e === h) {
                                i = c;
                                break
                            }
                            e || (i[h] = c)
                        } catch (p) { }
                    }
                    return i
                }
            }
            return (m.set = m).get = function (e) {
                return m.call(m, e)
            }, m.getJSON = function () {
                return m.apply({
                    json: !0
                }, [].slice.call(arguments))
            }, m.defaults = {}, m.remove = function (e, t) {
                m(e, "", v(t, {
                    expires: -1
                }))
            }, m.withConverter = e, m
        }
        return e(function () { })
    }), $(init), $(document).on("change", ".address_city select", function () {
        return city_id = $(".address_city option:selected").val(), $.get({
            url: "/api/v1/cities/" + city_id.toString() + "/districts.json"
        }, function (e) {
            var t, n, i, o;
            for (n = "", i = 0, o = e.length; i < o; i++) n += "<option value=" + (t = e[i]).id + ">" + t.name + "</option>";
            $(".address_district select").html(n), $("select").formSelect()
        })
    }), $(document).on("change", "#city", function () {
        var e;
        return e = $("#city option:selected").val(), $.get({
            url: "/api/v1/cities/" + e.toString() + "/districts.json"
        }, function (e) {
            var t, n, i, o;
            for (n = "", i = 0, o = e.length; i < o; i++) n += "<option value=" + (t = e[i]).id + ">" + t.name + "</option>";
            $("#district_id").html(n), $("select").formSelect()
        })
    }), $(document).on("submit", "#new_venue", function () {
        return $("#new_venue #venue_address_attributes_city").prop("disabled", !0)
    }), $(document).on("click", ".delete_image", function (e) {
        var t, n;
        if (e.preventDefault(), t = this, n = $(t).attr("href")) return $.ajax({
            url: n,
            method: "DELETE",
            dataType: "JSON",
            success: function () {
                return $(t).prev("img").hide("fast", function () {
                    return $(t).remove()
                })
            },
            error: function () {
                return M.toast({
                    html: "X\xf3a th\u1ea5t b\u1ea1i. Vui l\xf2ng th\u1eed l\u1ea1i!",
                    displayLength: 3e3
                })
            }
        })
    }), $(document).on("click", "#nearby_search", function (e) {
        return e.preventDefault(), navigator.geolocation ? ($(document.body).css({
            cursor: "wait"
        }), navigator.geolocation.getCurrentPosition(function (e) {
            return $(document.body).css({
                cursor: "default"
            }), window.location.href = "/san/tim/?distance=5&lat=" + e.coords.latitude + "&lng=" + e.coords.longitude
        }, showgeolocationError, {
                enableHighAccuracy: !0,
                timeout: 5e3,
                maximumAge: 18e5
            })) : M.toast({
                html: "Tr\xecnh duy\u1ec7t web c\u1ee7a b\u1ea1n kh\xf4ng cho ph\xe9p l\u1ea5y v\u1ecb tr\xed",
                displayLength: 3e3,
                classes: "alert"
            })
    }), $(document).on("submit", ".find_available_asset_form", function (e) {
        return e.preventDefault(), $("#booking_date").val() && $("#begin_time").val() ? find_available_assets_for_booking() : (M.toast({
            html: "Ch\u01b0a ch\u1ecdn ng\xe0y ho\u1eb7c gi\u1edd.",
            displayLength: 3e3,
            classes: "alert"
        }), !1)
    }), find_available_assets_for_booking = function () {
        return $.ajax({
            url: $(".find_available_asset_form").prop("action"),
            type: "GET",
            cache: !0,
            dataType: "script",
            data: $(".find_available_asset_form").serializeArray(),
            beforeSend: function () {
                return $("#search_loader").css("display", "block")
            },
            success: function () {
                var e = $(".find_available_asset_form").serializeArray(),
                    t = ["utf8=\u2713"];
                e.forEach(function (e) {
                    t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                }), t = t.join("&"), window.history.pushState("", "", window.location.pathname + "?" + t)
            }
        })
    }, $(document).on("click", "#call-venues", function () {
        "function" == typeof ga && ga("send", "event", "phones", $("#call-venues").data("event"))
    }), $(document).on("click", "#business-new-modal-event", function () {
        "function" == typeof ga && ga("send", "event", "register-business", $("#business-new-modal-event").data("event"))
    }), $(function () {
        620 < screen.width && ($(".period-list li").each(function (e, t) {
            $(t).find(".asset_category").height($(t).find(".info").height() + 5)
        }), $(".period-list").height() > $(".asset_category_info").parent().height() && $(".period-list").height($(".asset_category_info").parent().height())), createBookingRequest = function () {
            if (data = $(".find_available_asset_form").serializeArray(), 0 < $("#contact_booking_request").length) {
                if (0 == $("#contact_booking_request").val().length) return void M.toast({
                    html: "B\u1ea1n c\u1ea7n \u0111\u1ec3 l\u1ea1i email ho\u1eb7c s\u1ed1 \u0111i\u1ec7n tho\u1ea1i.",
                    displayLength: 3e3,
                    classes: "alert"
                });
                data.push({
                    name: "contact",
                    value: $("#contact_booking_request").val()
                })
            }
            $.ajax({
                url: "/booking_requests",
                type: "POST",
                dataType: "json",
                data: data,
                success: function (e) {
                    M.toast({
                        html: e.message,
                        displayLength: 3e3,
                        classes: "notice"
                    })
                }
            })
        }
    }), showgeolocationError = function (e) {
        switch (e.code) {
            case e.PERMISSION_DENIED:
                return M.toast({
                    html: "B\u1ea1n \u0111\xe3 t\u1eeb ch\u1ed1i chia s\u1ebb v\u1ecb tr\xed cho ch\xfang t\xf4i tr\u01b0\xf3c \u0111\xf3. H\xe3y b\u1eadt n\xf3 l\xean \u0111\u1ec3 s\u1eed d\u1ee5ng ch\u1ee9c n\u0103ng n\xe0y. C\u1ea3m \u01a1n!",
                    displayLength: 3e3
                });
            case e.POSITION_UNAVAILABLE:
                return M.toast({
                    html: "Kh\xf4ng x\xe1c \u0111\u1ecbnh \u0111\u01b0\u1ee3c v\u1ecb tr\xed c\u1ee7a b\u1ea1n",
                    displayLength: 3e3
                });
            case e.TIMEOUT:
                return M.toast({
                    html: "L\u1ed7i m\u1ea1ng. Xin m\u1eddi th\u1eed l\u1ea1i sau!",
                    displayLength: 3e3
                });
            case e.UNKNOWN_ERROR:
                return M.toast({
                    html: "C\xf3 l\u1ed7i x\u1ea3y ra, xin m\u1eddi th\u1eed l\u1ea1i",
                    displayLength: 3e3
                });
            default:
                return console.log(e.code)
        }
    }, $(booking);
var map = null,
    marker = null;
$(initMap), $(function () {
    switch ($("#page_section").data("section")) {
        case "profile":
            $("#edit_user_profile").addClass("selected");
            break;
        case "booking_requests":
            $("#booking_list").addClass("selected");
            break;
        case "announcements":
            $("#announcements").addClass("selected");
            break;
        case "password":
            $("#change_password").addClass("selected")
    }
}), $(function () {
    var n = {
        1: "R\u1ea5t t\u1ec7",
        2: "T\u1ec7",
        3: "B\xecnh th\u01b0\u1eddng",
        4: "T\u1ed1t",
        5: "R\u1ea5t t\u1ed1t"
    };
    $(".rating-modal").modal(), $(".rating-star").click(function () {
        var e = $(this).data("rating");
        rating_starts = $(this).parent(), rating_starts.find(".rating-star").removeClass("fas").addClass("far"), $(this).parent().parent().parent().find(".rating-text").text(n[e]), $(this).parent().parent().siblings("#score").val(e);
        for (var t = 1; t <= e; t++) star = rating_starts.find(".rating-star[data-rating=" + t + "]"), star.removeClass("far").addClass("fas").addClass("selected")
    })
});