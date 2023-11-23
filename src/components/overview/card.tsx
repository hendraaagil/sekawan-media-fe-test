import { Card, Metric } from '@tremor/react'

export const OverviewCard = ({
  title,
  value,
}: {
  title: string
  value: number
}) => (
  <Card className="group space-y-4 text-center transition-colors hover:bg-tremor-brand-subtle hover:bg-opacity-5">
    <p
      className="text-lg font-medium text-tremor-content-subtle transition-colors group-hover:text-tremor-brand-emphasis"
      color="blue"
    >
      {title}
    </p>
    <Metric className="transition-colors group-hover:text-tremor-brand-emphasis">
      {value}
    </Metric>
  </Card>
)
