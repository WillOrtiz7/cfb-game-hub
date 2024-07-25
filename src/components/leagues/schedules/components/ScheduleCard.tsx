export function ScheduleCard() {
  return (
    <div className="bg-background rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg"
            alt="Team A Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">Team A</h3>
            <p className="text-muted-foreground text-sm">4-2</p>
          </div>
        </div>
        <div className="text-2xl font-bold">24</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg"
            alt="Team B Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">Team B</h3>
            <p className="text-muted-foreground text-sm">3-3</p>
          </div>
        </div>
        <div className="text-2xl font-bold">21</div>
      </div>
    </div>
  );
}
