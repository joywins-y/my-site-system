import { validLoginId, isExternal } from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('validLoginId', () => {
    expect(validLoginId('admin')).toBe(true)
    expect(validLoginId('editor')).toBe(true)
    expect(validLoginId('xxxx')).toBe(false)
  })
  it('isExternal', () => {
    expect(isExternal('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('github.com/PanJiaChen/vue-element-admin')).toBe(false)
    expect(isExternal('/dashboard')).toBe(false)
    expect(isExternal('./dashboard')).toBe(false)
    expect(isExternal('dashboard')).toBe(false)
  })
})
