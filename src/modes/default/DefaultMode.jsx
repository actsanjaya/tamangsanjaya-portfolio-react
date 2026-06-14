import { TestingMode } from '../testing/TestingMode.jsx'

export function DefaultMode(props) {
  return <TestingMode {...props} enableTesting3D={false} />
}
