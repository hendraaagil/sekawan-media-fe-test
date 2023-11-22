import { Card, Flex, Metric, ProgressBar, Text } from '@tremor/react'

const CardComp = () => (
  <Card className="mx-auto max-w-xs">
    <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
  </Card>
)

export default function App() {
  return (
    <Flex className="min-h-screen flex-col justify-center space-y-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <CardComp />
    </Flex>
  )
}
