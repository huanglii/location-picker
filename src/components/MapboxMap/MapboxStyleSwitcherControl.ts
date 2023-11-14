import NaiveMap from '@naivemap/mapbox-gl-naive-map'

export type MapboxStyleDefinition = {
  title: string
  uri: string
}

export type MapboxStyleSwitcherOptions = {
  defaultStyle?: string
  eventListeners?: MapboxStyleSwitcherEvents
}

type MapboxStyleSwitcherEvents = {
  onOpen?: (event: MouseEvent) => boolean
  onSelect?: (event: MouseEvent) => boolean
  onChange?: (event: MouseEvent, style: string) => boolean
}

export class MapboxStyleSwitcherControl implements mapboxgl.IControl {
  private static readonly DEFAULT_STYLE = '标准'
  private static readonly DEFAULT_STYLES: MapboxStyleDefinition[] = [
    { title: '标准', uri: 'mapbox://styles/huanglii/clm8knsuz012801r41pbwdcku' },
    { title: '浅色', uri: 'mapbox://styles/huanglii/clm93m2qr011a01r671y2hjjm' },
    { title: '深色', uri: 'mapbox://styles/huanglii/clm8quldc013701nza7a35j7j' },
    { title: '影像1', uri: './style/satellite.json' },
    { title: '影像2', uri: 'mapbox://styles/huanglii/cl0j3k0wn000n14nznby52wod' },
  ]

  private controlContainer: HTMLElement | undefined
  private events?: MapboxStyleSwitcherEvents
  private map?: NaiveMap
  private mapStyleContainer: HTMLElement | undefined
  private styleButton: HTMLButtonElement | undefined
  private styles: MapboxStyleDefinition[]
  private defaultStyle: string

  constructor(styles?: MapboxStyleDefinition[], options?: MapboxStyleSwitcherOptions | string) {
    this.styles = styles || MapboxStyleSwitcherControl.DEFAULT_STYLES
    const defaultStyle = typeof options === 'string' ? options : options ? options.defaultStyle : undefined
    this.defaultStyle = defaultStyle || MapboxStyleSwitcherControl.DEFAULT_STYLE
    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.events = typeof options !== 'string' && options ? options.eventListeners : undefined
  }

  public getDefaultPosition(): string {
    const defaultPosition = 'top-right'
    return defaultPosition
  }

  public onAdd(map: NaiveMap): HTMLElement {
    this.map = map
    this.controlContainer = document.createElement('div')
    this.controlContainer.classList.add('mapboxgl-ctrl')
    this.controlContainer.classList.add('mapboxgl-ctrl-group')
    this.mapStyleContainer = document.createElement('div')
    this.styleButton = document.createElement('button')
    this.styleButton.type = 'button'
    this.mapStyleContainer.classList.add('mapboxgl-style-list')
    for (const style of this.styles) {
      const styleElement = document.createElement('button')
      styleElement.type = 'button'
      styleElement.innerText = style.title
      styleElement.classList.add(style.title.replace(/[^a-z0-9-]/gi, '_'))
      styleElement.dataset.uri = JSON.stringify(style.uri)
      styleElement.addEventListener('click', (event) => {
        const srcElement = event.srcElement as HTMLButtonElement
        this.closeModal()
        if (srcElement.classList.contains('active')) {
          return
        }
        if (this.events && this.events.onOpen && this.events.onOpen(event)) {
          return
        }
        const style = JSON.parse(srcElement.dataset.uri!)
        this.map!.setBasemapStyle(style)
        const elms = this.mapStyleContainer!.getElementsByClassName('active')
        while (elms[0]) {
          elms[0].classList.remove('active')
        }
        srcElement.classList.add('active')
        if (this.events && this.events.onChange && this.events.onChange(event, style)) {
          return
        }
      })
      if (style.title === this.defaultStyle) {
        styleElement.classList.add('active')
      }
      this.mapStyleContainer.appendChild(styleElement)
    }
    this.styleButton.classList.add('mapboxgl-ctrl-icon')
    this.styleButton.classList.add('mapboxgl-style-switcher')
    this.styleButton.addEventListener('click', (event) => {
      if (this.events && this.events.onSelect && this.events.onSelect(event)) {
        return
      }
      this.openModal()
    })

    document.addEventListener('click', this.onDocumentClick)

    this.controlContainer.appendChild(this.styleButton)
    this.controlContainer.appendChild(this.mapStyleContainer)
    return this.controlContainer
  }

  public onRemove(): void {
    if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.styleButton) {
      return
    }
    this.styleButton.removeEventListener('click', this.onDocumentClick)
    this.controlContainer.parentNode.removeChild(this.controlContainer)
    document.removeEventListener('click', this.onDocumentClick)
    this.map = undefined
  }

  private closeModal(): void {
    if (this.mapStyleContainer && this.styleButton) {
      this.mapStyleContainer.style.display = 'none'
      this.styleButton.style.display = 'block'
    }
  }

  private openModal(): void {
    if (this.mapStyleContainer && this.styleButton) {
      this.mapStyleContainer.style.display = 'block'
      this.styleButton.style.display = 'none'
    }
  }

  private onDocumentClick(event: MouseEvent): void {
    if (this.controlContainer && !this.controlContainer.contains(event.target as Element)) {
      this.closeModal()
    }
  }
}
