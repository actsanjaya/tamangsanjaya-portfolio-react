export function TestingCube3D({ className = '', decorative = true }) {
  const classNames = ['testingCube3d', className].filter(Boolean).join(' ')

  return (
    <div className={classNames} aria-hidden={decorative}>
      <span className="testingCubeFace testingCubeFaceFront"></span>
      <span className="testingCubeFace testingCubeFaceBack"></span>
      <span className="testingCubeFace testingCubeFaceRight"></span>
      <span className="testingCubeFace testingCubeFaceLeft"></span>
      <span className="testingCubeFace testingCubeFaceTop"></span>
      <span className="testingCubeFace testingCubeFaceBottom"></span>
    </div>
  )
}

export function TestingSphere3D({ className = '', decorative = true }) {
  const classNames = ['testingSphere3d', className].filter(Boolean).join(' ')

  return (
    <div className={classNames} aria-hidden={decorative}>
      <span className="testingSphereCore"></span>
      <span className="testingSphereRing testingSphereRingOne"></span>
      <span className="testingSphereRing testingSphereRingTwo"></span>
      <span className="testingSphereRing testingSphereRingThree"></span>
    </div>
  )
}

export function TestingPyramid3D({ className = '', decorative = true }) {
  const classNames = ['testingPyramid3d', className].filter(Boolean).join(' ')

  return (
    <div className={classNames} aria-hidden={decorative}>
      <span className="testingPyramidTriangle testingPyramidTriangleFront"></span>
      <span className="testingPyramidTriangle testingPyramidTriangleRight"></span>
      <span className="testingPyramidTriangle testingPyramidTriangleLeft"></span>
      <span className="testingPyramidTriangle testingPyramidTriangleBack"></span>
    </div>
  )
}

export function TestingOrb({ className = '', decorative = true }) {
  const classNames = ['testingOrb', className].filter(Boolean).join(' ')

  return <span className={classNames} aria-hidden={decorative}></span>
}
