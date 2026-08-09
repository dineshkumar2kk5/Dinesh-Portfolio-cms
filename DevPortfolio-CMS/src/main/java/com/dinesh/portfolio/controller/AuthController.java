package com.dinesh.portfolio.controller;

import com.dinesh.portfolio.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Handles authentication pages: login and user registration.
 * Spring Security handles the actual authentication process.
 */
@Controller
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String loginPage(@RequestParam(value = "error", required = false) String error,
                            @RequestParam(value = "logout", required = false) String logout,
                            @RequestParam(value = "denied", required = false) String denied,
                            Model model) {
        if (error != null) {
            model.addAttribute("errorMessage", "Invalid username or password.");
        }
        if (logout != null) {
            model.addAttribute("successMessage", "You have been logged out successfully.");
        }
        if (denied != null) {
            model.addAttribute("errorMessage", "Access denied. Admin privileges required.");
        }
        model.addAttribute("pageTitle", "Login — DevPortfolio CMS");
        return "auth/login";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "redirect:/auth/login";
    }

    @PostMapping("/register")
    public String processRegistration() {
        return "redirect:/auth/login";
    }
}
