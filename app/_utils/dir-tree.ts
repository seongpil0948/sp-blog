import dirTree from 'directory-tree'
import type {
  DirectoryTree,
  DirectoryTreeOptions,
  DirectoryTreeCallback,
} from 'directory-tree'
import { TreeSectionProps } from '../_components/client-only/tree-section'

type TDirCustom = {
  href: string
}
const callback: DirectoryTreeCallback<TDirCustom> = (item, path) => {
  if (path.includes('[lang]')) {
    path = path.split('[lang]')[1]
    // remove any extension from path
    path = path.replace(/\.[^/.]+$/, '')
    path = path.replace(/\/index$/, '')
    path = path.replace(/\/content$/, '')
    console.log(path)
  }
  item.custom = {
    href: path,
  }
}

export function getTree(dir: string, options?: DirectoryTreeOptions) {
  const libTree = dirTree(dir, options, callback, callback)
  return dirTreeToTree(libTree)
  
}
function dirTreeToTree(dirTree: DirectoryTree<TDirCustom>): TreeSectionProps {
    dirTree.name = dirTree.name.replace('.mdx', '').replace('.tsx', '')
  return {
    label: dirTree.name,
    href: dirTree.custom.href,
    children: dirTree.children?.map(dirTreeToTree).filter(obj => !obj.label.includes('content')),
  }
}