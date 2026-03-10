"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    UtensilsCrossed,
    Menu,
    ShoppingBag,
    Search,
    User,
    LogOut
} from "lucide-react";
import { Logo } from "./Logo";
import {
    SheetHeader,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserSession } from "@/app/types/user";
import { getCart } from "@/helpers/cart.helper";
import { userService } from "@/service/user.service";
import { getServerSessionAction, logoutUserAction } from "@/action/auth.action";

// --- 1. SCALABLE LINK CONFIGURATION ---
// Add or remove links here, and the whole UI (Desktop & Mobile) updates.
const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meal", href: "/meals" },
    { name: "Providers", href: "/providers" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();

      const router = useRouter();

 
  const [session, setSession] = useState<UserSession | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);


  const refreshSession = useCallback(async () => {
    const serverSession = await getServerSessionAction();
    setSession(serverSession as UserSession | null);
  }, []);

  useEffect(() => {
    const initNavbar = async () => {
      // 1. Initial truth from Server Action
      await refreshSession();

      // 2. Initial Cart Sync
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

      // 3. Prevent Hydration Mismatch
      setMounted(true);
    };

    initNavbar();

    // 4. Listen for tab focus/back-forward to clear "ghost" sessions
    window.addEventListener("focus", refreshSession);

    // 5. Cart Listener
    const updateCartCount = () => {
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };

    window.addEventListener("cart-updated", updateCartCount);
    
    return () => {
      window.removeEventListener("focus", refreshSession);
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, [refreshSession]);

  const handleCartClick = () => {
    if (!session) {
      router.push("/sign-in");
    } else {
      router.push("/dashboard/my-cart");
    }
  };

  const handleSignOut = async () => {
 
    await logoutUserAction();
    
    setSession(null);
    
   
    window.location.href = "/";
  };

 
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-md h-20">
        <div className="container mx-auto px-6 flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-600 rounded-xl" />
            <span className="text-xl font-black text-gray-900">Food<span className="text-blue-600">Hub</span></span>
          </div>
          <div className="h-9 w-24 bg-slate-50 animate-pulse rounded-full" />
        </div>
      </header>
    );
  }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">

                {/* --- 2. FANCY LOGO WITH ICON --- */}
                <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
                        <UtensilsCrossed className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-gray-900">
                        Food<span className="text-blue-600">Hub</span>
                    </span>
                </Link>

                {/* --- 3. DESKTOP NAVIGATION --- */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-sm font-bold transition-all hover:text-blue-600",
                            pathname === link.href ? "text-blue-600 underline underline-offset-8 decoration-2" : "text-gray-600"
                        )}
                        >
                        {link.name}
                        </Link>
                    ))}
                </nav>

                {/* --- 4. ACTION ICONS & BUTTONS --- */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-gray-600">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative rounded-full text-gray-600"
                        onClick={handleCartClick}
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                            {cartCount}
                        </span>
                        )}
                    </Button>

                    {session ? (
                        <div className="flex items-center gap-3">
                        <span className="hidden xl:block text-[10px] font-black uppercase text-slate-400 tracking-widest">
                            Hi, {session.name}
                        </span>
                        <Button 
                            onClick={handleSignOut}
                            variant="outline"
                            className="hidden md:flex rounded-full px-6 font-bold border-blue-600 text-blue-600 hover:bg-blue-50 transition-all active:scale-95"
                        >
                            <LogOut className="h-4 w-4 mr-2" /> Sign Out
                        </Button>
                        </div>
                    ) : (
                        <>
                        <Link href="/sign-in">
                        <Button className="hidden md:flex rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                            Sign In
                        </Button>
                        </Link>
                        <Link href="/sign-up">
                        <Button className="hidden md:flex rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                            Sign Up
                        </Button>
                        </Link>
                        </>
                    )}

                    {/* --- RESPONSIVE MOBILE MENU --- */}
                    <div className="lg:hidden">
                        <Sheet> {/* This is the "Dialog" parent */}
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-[300px]">
                           
                                <SheetHeader className="text-left">
                                    <SheetTitle className="flex items-center gap-2 text-2xl font-black">
                                        <UtensilsCrossed className="h-6 w-6 text-blue-600" />
                                        Food<span className="text-blue-600">Hub</span>
                                    </SheetTitle>
                                    <SheetDescription>
                                        Delicious meals delivered to your door.
                                    </SheetDescription>
                                </SheetHeader>

                                {/* 2. Navigation Links */}
                                <nav className="flex flex-col gap-6 mt-10">
                                    {navLinks.map((link) => (
                                        <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn("text-lg font-bold transition-colors", pathname === link.href ? "text-blue-600" : "text-gray-800 hover:text-blue-600")}
                                        >
                                        {link.name}
                                        </Link>
                                    ))}
                                    <hr className="my-2 border-blue-50" />
                                    {session ? (
                                        <Button onClick={handleSignOut} variant="destructive" className="w-full rounded-xl h-12 text-lg">Logout</Button>
                                    ) : (
                                        <>
                                        <Link href="/sign-in"><Button className="w-full bg-blue-600 rounded-xl h-12 text-lg text-white">Sign In</Button></Link>
                                        <Link href="/sign-up"><Button className="w-full bg-blue-600 rounded-xl h-12 text-lg text-white">Sign Up</Button></Link>
                                        </>
                                    )}
                                    </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}


