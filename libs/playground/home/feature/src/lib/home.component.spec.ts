import { RouterTestingModule } from '@angular/router/testing'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>
  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [RouterTestingModule],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })

  it('should contain links', () => {
    expect(spectator.queryAll('a')).toHaveLength(spectator.component.links.length)
    spectator.component.links.forEach((link) => {
      expect(spectator.query(`a[href="${link.path}"]`)).toBeTruthy()
      expect(spectator.query(`a[href="${link.path}"] > p`)).toHaveText(link.label)
    })
  })
})
