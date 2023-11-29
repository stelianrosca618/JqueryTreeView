import TreeselectInput from "./input.js";
import TreeselectList from "./list.js";
class Treeselect {
    #htmlContainer = null;
    #treeselectList = null;
    #treeselectInput = null;
    #transform = {
        top: null,
        bottom: null
    };
    #treeselectInitPosition = null;
    #containerResizer = null;
    #containerWidth = 0;
    #scrollEvent = null;
    #focusEvent = null;
    #blurEvent = null;
    constructor({parentHtmlContainer: e, value: t, options: s, openLevel: i, appendToBody: n, alwaysOpen: l, showTags: r, clearable: o, searchable: c, placeholder: a, grouped: d, listSlotHtmlComponent: h, disabled: u, emptyText: p}) {
        this.parentHtmlContainer = e,
        this.value = t ?? [],
        this.options = s ?? [],
        this.openLevel = i ?? 0,
        this.appendToBody = n ?? !0,
        this.alwaysOpen = l && !u,
        this.showTags = r ?? !0,
        this.clearable = o ?? !0,
        this.searchable = c ?? !0,
        this.placeholder = a ?? "Search...",
        this.grouped = d ?? !0,
        this.listSlotHtmlComponent = h ?? null,
        this.disabled = u ?? !1,
        this.emptyText = p ?? "No results found...",
        this.srcElement = null,
        this.mount()
    }
    mount() {
        this.srcElement && (this.#closeList(),
        this.srcElement.innerHTML = "",
        this.srcElement = null,
        this.#removeOutsideListeners()),
        this.srcElement = this.#createTreeselect(),
        this.#scrollEvent = this.scrollWindowHandler.bind(this),
        this.#focusEvent = this.focusWindowHandler.bind(this),
        this.#blurEvent = this.blurWindowHandler.bind(this),
        this.alwaysOpen && this.#treeselectInput.openClose(),
        this.disabled && this.srcElement.classList.add("treeselect--disabled")
    }
    updateValue(e) {
        const t = this.#treeselectList;
        t.updateValue(e);
        var {groupedIds: e, ids: s} = t.selectedNodes
          , e = this.grouped ? e : s;
          console.log('logged', e);
        this.#treeselectInput.updateValue(e)
    }
    destroy() {
        this.srcElement && (this.#closeList(),
        this.srcElement.innerHTML = "",
        this.srcElement = null,
        this.#removeOutsideListeners())
    }
    #createTreeselect() {
        const t = this.parentHtmlContainer
          , s = (t.classList.add("treeselect"),
        new TreeselectList({
            options: this.options,
            value: this.value,
            openLevel: this.openLevel,
            listSlotHtmlComponent: this.listSlotHtmlComponent,
            emptyText: this.emptyText
        }));
        var {groupedIds: e, ids: i} = s.selectedNodes;
        const n = new TreeselectInput({
            value: this.grouped ? e : i,
            showTags: this.showTags,
            clearable: this.clearable,
            isAlwaysOpened: this.alwaysOpen,
            searchable: this.searchable,
            placeholder: this.placeholder,
            disabled: this.disabled
        });
        return this.appendToBody && (this.#containerResizer = new ResizeObserver(()=>{
            var e = this.srcElement.getBoundingClientRect()["width"];
            this.#containerWidth = e,
            this.updateListPosition(t, s.srcElement, !0)
        }
        )),
        n.srcElement.addEventListener("input", e=>{
            e = e.detail.map(({id: e})=>e);
            this.value = e,
            console.log('inputing', e);
            s.updateValue(e),
            this.#emitInput()
        }
        ),
        n.srcElement.addEventListener("open", ()=>this.#openList()),
        n.srcElement.addEventListener("keydown", e=>s.callKeyAction(e.key)),
        n.srcElement.addEventListener("search", e=>{
            s.updateSearchValue(e.detail),
            this.updateListPosition(t, s.srcElement, !0)
        }
        ),
        n.srcElement.addEventListener("focus", ()=>{
            this.#updateFocusClasses(!0),
            document.addEventListener("mousedown", this.#focusEvent, !0),
            document.addEventListener("focus", this.#focusEvent, !0),
            window.addEventListener("blur", this.#blurEvent)
        }
        , !0),
        this.alwaysOpen || n.srcElement.addEventListener("close", ()=>{
            this.#closeList()
        }
        ),
        s.srcElement.addEventListener("mouseup", ()=>{
            n.focus()
        }
        , !0),
        s.srcElement.addEventListener("input", e=>{
            const {groupedIds: t, ids: s} = e.detail;
            console.log('inpuss', e, e.CustomEvent, this );
            //e = this.grouped ? t : s;
            e = s;
            if(t.length > 0){
                t.map(tItem => {
                    if(tItem.isGroup && tItem.childOf == 0){
                        e.unshift( tItem );
                    }
                })
            }
            n.updateValue(e),
            this.value = s.map(({id: e})=>e),
            console.log('inooo', this.value);
            n.focus(),
            this.#emitInput()
        }
        ),
        s.srcElement.addEventListener("arrow-click", ()=>{
            n.focus(),
            this.updateListPosition(t, s.srcElement, !0)
        }
        ),
        this.#htmlContainer = t,
        this.#treeselectList = s,
        this.#treeselectInput = n,
        t.append(n.srcElement),
        t
    }
    #openList() {
        window.addEventListener("scroll", this.#scrollEvent, !0),
        this.appendToBody ? (document.body.appendChild(this.#treeselectList.srcElement),
        this.#containerResizer.observe(this.#htmlContainer)) : this.#htmlContainer.appendChild(this.#treeselectList.srcElement),
        this.updateListPosition(this.#htmlContainer, this.#treeselectList.srcElement, !1),
        this.#updateOpenCloseClasses(!0),
        this.#treeselectList.focusFirstListElement()
    }
    #closeList() {
        window.removeEventListener("scroll", this.#scrollEvent, !0),
        (this.appendToBody ? document.body : this.#htmlContainer).contains(this.#treeselectList.srcElement) && (this.appendToBody ? (document.body.removeChild(this.#treeselectList.srcElement),
        this.#containerResizer?.disconnect()) : this.#htmlContainer.removeChild(this.#treeselectList.srcElement),
        this.#updateOpenCloseClasses(!1))
    }
    #updateDirectionClasses(e, t) {
        var s = t ? "treeselect-list--top-to-body" : "treeselect-list--top"
          , t = t ? "treeselect-list--bottom-to-body" : "treeselect-list--bottom";
        e ? (this.#treeselectList.srcElement.classList.add(s),
        this.#treeselectList.srcElement.classList.remove(t),
        this.#treeselectInput.srcElement.classList.add("treeselect-input--top"),
        this.#treeselectInput.srcElement.classList.remove("treeselect-input--bottom")) : (this.#treeselectList.srcElement.classList.remove(s),
        this.#treeselectList.srcElement.classList.add(t),
        this.#treeselectInput.srcElement.classList.remove("treeselect-input--top"),
        this.#treeselectInput.srcElement.classList.add("treeselect-input--bottom"))
    }
    #updateFocusClasses(e) {
        e ? (this.#treeselectInput.srcElement.classList.add("treeselect-input--focused"),
        this.#treeselectList.srcElement.classList.add("treeselect-list--focused")) : (this.#treeselectInput.srcElement.classList.remove("treeselect-input--focused"),
        this.#treeselectList.srcElement.classList.remove("treeselect-list--focused"))
    }
    #updateOpenCloseClasses(e) {
        e ? this.#treeselectInput.srcElement.classList.add("treeselect-input--opened") : this.#treeselectInput.srcElement.classList.remove("treeselect-input--opened")
    }
    #removeOutsideListeners() {
        window.removeEventListener("scroll", this.#scrollEvent, !0),
        document.removeEventListener("click", this.#focusEvent, !0),
        document.removeEventListener("focus", this.#focusEvent, !0),
        window.removeEventListener("blur", this.#blurEvent)
    }
    scrollWindowHandler() {
        this.updateListPosition(this.#htmlContainer, this.#treeselectList.srcElement, !0)
    }
    focusWindowHandler(e) {
        this.#htmlContainer.contains(e.target) || this.#treeselectList.srcElement.contains(e.target) || (this.#treeselectInput.blur(),
        this.#removeOutsideListeners(),
        this.#updateFocusClasses(!1))
    }
    blurWindowHandler() {
        this.#treeselectInput.blur(),
        this.#removeOutsideListeners(),
        this.#updateFocusClasses(!1)
    }
    updateListPosition(e, t, s) {
        var i = e.getBoundingClientRect().y
          , n = window.innerHeight - e.getBoundingClientRect().y
          , l = t.clientHeight
          , n = n < i && window.innerHeight - i < l + 45
          , i = n ? "top" : "buttom"
          , r = t.getAttribute("direction");
        if (this.#htmlContainer.setAttribute("direction", i),
        !this.appendToBody)
            return r === i ? void 0 : void this.#updateDirectionClasses(n, !1);
        if (!this.#treeselectInitPosition || s) {
            t.style.transform = null;
            const {x: d, y: o} = t.getBoundingClientRect()
              , {x: c, y: a} = e.getBoundingClientRect();
            this.#treeselectInitPosition = {
                containerX: c,
                containerY: a,
                listX: d,
                listY: o
            }
        }
        const {listY: o, containerX: c, containerY: a} = this.#treeselectInitPosition;
        i = e.clientHeight;
        r && !s || (this.#transform.top = `translateY(${a - o - l}px)`,
        this.#transform.bottom = `translateY(${a + i - o}px)`),
        t.style.transform = n ? this.#transform.top : this.#transform.bottom,
        this.#updateDirectionClasses(n, !0),
        t.style.width = this.#containerWidth + "px",
        t.style.left = c + "px"
    }
    #emitInput() {
        this.srcElement.dispatchEvent(new CustomEvent("input",{
            detail: this.value
        }))
    }
}
export default Treeselect;
