"use client";

import { useMemo, useState } from "react";
import { whitelist } from "@/generatedWhitelist";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Telegram from "@/components/icons/telegram";

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<
    Array<{ wallet: string; isWhitelisted: boolean }>
  >([]);

  const checkWallets = () => {
    const wallets = input
      .split(/[\s,]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    const checkResults = wallets.map((wallet) => ({
      wallet,
      isWhitelisted: whitelist.has(wallet),
    }));

    setResults(checkResults);
  };

  const totalWhitelisted = useMemo(
    () => results.filter((result) => result.isWhitelisted).length,
    [results]
  );

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <div className="fixed inset-0 animated-gradient" />

      <Card className="shadow-lg relative max-w-2xl mx-auto backdrop-blur-sm bg-white/95 dark:bg-black/80">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">
            $SONIC x BONK Whitelist Checker
          </h1>
          <p className="text-center text-muted-foreground">
            Total whitelisted wallets: {whitelist.size}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            className="min-h-[200px] font-mono"
            placeholder="Enter wallet addresses (separated by comma, space, or new line)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={checkWallets} className="w-full" size="lg">
            Check Wallets
          </Button>

          {results.length > 0 && (
            <div className="space-y-2 mt-4">
              <h2 className="text-lg font-semibold">
                Results: {totalWhitelisted}/{results.length} whitelisted
              </h2>
              <div className="space-y-1">
                {results.map(({ wallet, isWhitelisted }, index) => (
                  <Card
                    key={index}
                    className={`${
                      isWhitelisted
                        ? "bg-green-50/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-900/50"
                        : "bg-red-50/50 dark:bg-red-900/20 border-red-200/50 dark:border-red-900/50"
                    }`}
                  >
                    <CardContent className="p-2 flex items-center justify-between">
                      <p
                        className={`font-mono text-sm break-all ${
                          isWhitelisted
                            ? "text-green-800 dark:text-green-200"
                            : "text-red-800 dark:text-red-200"
                        }`}
                      >
                        {wallet}
                      </p>
                      {isWhitelisted ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center pt-6 border-t">
          <a
            href="https://t.me/+Pt8MwHxgf8QwMGMy"
            target="_blank"
            rel="noopener noreferrer"
            className=" font-bold hover:text-primary transition-colors flex items-center gap-2"
          >
            <Telegram className="w-4 h-4" />
            by 3k
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
