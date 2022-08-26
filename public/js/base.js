const select = dom => document.querySelector(dom);
const selectAll = dom => document.querySelectorAll(dom);

function inArray(needle, haystack) {
    let length = haystack.length;
    for (let i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}
const removeArray = (toRemove, arr) => {
    let index = arr.indexOf(toRemove);
    arr.splice(index, 1);
}
    
const post = (url, data) => {
    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (data.hasOwnProperty('csrfToken')) {
        options['headers']['X-CSRF-TOKEN'] = data.csrfToken;
    }

    return fetch(url, options).then(res => res.json())
}
const get = url => {
    return fetch(url).then(res => res.json());
}

function createElement(props) {
    let el = document.createElement(props.el)
    if (props.attributes !== undefined) {
        props.attributes.forEach(res => {
            el.setAttribute(res[0], res[1])
        })
    }
    if(props.html !== undefined) {
        el.innerHTML = props.html
    }
    select(props.createTo).appendChild(el)
}

const bindDivWithImage = () => {
    const divsWithBgImg = selectAll("div[bg-image]")
    divsWithBgImg.forEach(div => {
        let bg = div.getAttribute('bg-image');
        let styles = getComputedStyle(div);
        div.style.backgroundImage = `url(\'${bg}\')`;
        div.style.backgroundPosition = 'center center';
        div.style.backgroundSize = 'cover';
    });
}
// setTimeout(() => {
    bindDivWithImage();
// }, 1000);

const modal = (sel = null) => {
    let selector = typeof sel == 'string' ? document.querySelector(`.modal${sel}`) : sel;
    selector.show = () => {
        selector.style.display = "block";
    }
    selector.hide = () => {
        if (typeof sel != 'string') {
            selector = selector.parentNode.parentNode.parentNode;
        }
        selector.style.display = "none";
    }
    return selector;
}

document.querySelectorAll(".modal span[hide]").forEach(btn => {
    btn.setAttribute('onclick', 'modal(this).hide()');
});


let keyboards = {
    Escape: () => {
        document.querySelectorAll(".modal").forEach(mod => modal(`#${mod.getAttribute('id')}`).hide());
    },
};
document.addEventListener('keydown', e => {
    if (keyboards.hasOwnProperty(e.key)) {
        keyboards[e.key]();
    }
});

const press = (key, callback) => {
    keyboards[key] = callback;
}

const inputFile = (input, previewArea) => {
    let file = input.files[0];
    let reader = new FileReader();
    let preview = select(previewArea);
    reader.readAsDataURL(file);
    selectAll(`${previewArea} i,${previewArea} div`).forEach(el => {
        el.style.opacity = "0.01";
    })

    reader.addEventListener("load", function() {
        preview.setAttribute('bg-image', reader.result);
        bindDivWithImage();
    });
}

const escapeJson = str => {
    return str.replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\f/g, "\\f");
}

const squarize = () => {
    let doms = selectAll(".squarize");
    doms.forEach(dom => {
        let classes = dom.classList;
        let computedStyle = getComputedStyle(dom);
        if (classes.contains('rectangle')) {
            let width = computedStyle.width.split("px")[0];
            let widthRatio = parseFloat(width) / 16;
            let setHeight = 9 * widthRatio;
            dom.style.height = `${setHeight}px`;
        } else {
            if (classes.contains('use-lineHeight')) {
                dom.style.lineHeight = computedStyle.width;
            } else if (classes.contains('use-height')) {
                dom.style.width = computedStyle.height;
            } else {
                dom.style.height = computedStyle.width;
            }
        }
    });
}

squarize();