import { equal } from 'uvu/assert'
import { atom } from 'nanostores'
import { test } from 'uvu'

import { setLocale, setTranslationLoader, i18n } from '../index.js'

test('sets locale and loader', async () => {
  let loaded: string[][] = []
  let locale = atom('fr')

  setTranslationLoader(async (code, components) => {
    loaded.push([code, ...components])
    return {}
  })
  setLocale(locale)
  equal(loaded, [])

  let messages = i18n('component', {
    test: 'test'
  })
  messages.listen(() => {})
  equal(loaded, [['fr', 'component']])

  locale.set('ru')
  equal(loaded, [
    ['fr', 'component'],
    ['ru', 'component']
  ])
})

test.run()
