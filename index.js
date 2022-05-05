function renderContent(renderInformation) {

  const element = renderInformation.element
  validateElementType(renderInformation)
  const content = creatRenderableContent(renderInformation)

  return content
}


function validateElementType(element) {

  const isNotObject = Object.prototype.toString.call(element).slice(8, -1) !== 'Object' ? true : false

  if (isNotObject) {
    throw new Error('Invalid element.')
  }
}

function creatRenderableContent(renderInformation) {

  const tags = creatTags(
    renderInformation.element,
    renderInformation.attributes
  )
  const template = tags.opening + renderInformation.content + tags.closing
  return template
}

function creatTags(element, attributes) {
  const attributeList = generateAttributesList(attributes)
  const openingTag = buildTag({
    attributes: attributeList,
    element: element,
    isOpening: true
  })
  const closingTag = buildTag({
    element: element,
    isOpening: false
  })
  return { opening: openingTag, closing: closingTag }
}

function generateAttributesList(attributes) {
  let attributesList = ''
  for (const attribute of attributes) {
    attributesList = `${attributesList} ${attribute.name}="${attribute.value}"`
  }
  return attributesList
}

function buildTag(tagInfromation) {
  const element = tagInfromation.element
  const attributes = tagInfromation.attributes
  const isOpeningTag = tagInfromation.isOpening

  let tag
  if (isOpeningTag) {
    tag = `<${element} ${attributes}>`
  } else {
    tag = `</${element}>`
  }

  return tag
}

const tagData = {
  element: 'div',
  attributes: [
    { name: 'ttt', value: 'name' },
    { name: '123', value: '1995' }
  ],
  content: 'lorem impsum'
}


const tag = renderContent(tagData)
console.log(tag)