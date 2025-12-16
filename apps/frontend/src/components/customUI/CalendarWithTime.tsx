import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useState } from "react";
import type { CalendarWithTimeProps } from "@/types/calendar.types";

export function CalendarWithTime({ value, onChange }: CalendarWithTimeProps) {
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState<Date>(value || new Date());

  useEffect(() => {
    if (value) setDateTime(value);
  }, [value]);

  const updateDateTime = useCallback(
    (date?: Date, time?: string) => {
      const updated = new Date(dateTime);

      if (date) {
        updated.setFullYear(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
      }

      if (time) {
        const [hours, minutes, seconds] = time.split(":").map(Number);
        updated.setHours(hours, minutes, seconds || 0);
      }

      setDateTime(updated);
      onChange(updated);
    },
    [dateTime, onChange]
  );

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {dateTime.toLocaleDateString()}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
            <Calendar
              mode="single"
              selected={dateTime}
              captionLayout="dropdown"
              onSelect={(date) => {
                updateDateTime(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={dateTime.toTimeString().slice(0, 8)}
          onChange={(e) => updateDateTime(undefined, e.target.value)}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
