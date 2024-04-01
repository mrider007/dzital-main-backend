<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dzital</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
    <link rel="stylesheet" href="./assets/css/custom.css" />
</head>

<body>

    <!--************ navbar part start here ************-->
    <nav class="navbar navbar-expand-lg bg-light border-bottom border-1">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <img src="./assets/images/logo.png" alt>
            </a>
            <ul class="navListInline">
                <li><a class="nav-link" href="javascript:void(0)"><i class="fa fa-map-marker"></i> Kolkata</a></li>
                <li><a class="nav-link" href="javascript:void(0)"><i class="fa fa-language"></i> <span>English</span></a></li>
                <li><a class="nav-link" href="login.php"><i class="fa fa-user"></i> <span>Login</span> </a></li>
            </ul>
        </div>
    </nav>
    <section class="p-2 bg-theme">
        <article class="container">
            <form class="input-group">
                <input type="text" class="form-control" placeholder="Search..." />
                <button class="btn btn-warning" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
            </form>
        </article>
    </section>
    <nav class="navbar navbar-expand-lg mainMenuBx bg-light border-bottom border-1 text16">
        <div class="container">
            <div class="row">
                <div class="col-md-2 col-sm-3">
                    <!-- Category start -->
                    <div class="dropdown-cente categoryBx">
                        <button class="btn btn-info dropdown-toggle width100 btnTheme" type="button" data-bs-toggle="dropdown" aria-expanded="false">Category</button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="freelancer-list.php">Freelancer</a></li>
                            <li><a class="dropdown-item" href="jobs-list.php">Jobs</a></li>
                            <li><a class="dropdown-item" href="realestate-list.php">Realestate</a></li>
                            <li><a class="dropdown-item" href="lessons-courses.php">Lessons &
                                    Courses</a></li>
                            <li><a class="dropdown-item" href="fashion-beauty.php">Fashion &
                                    Beauty</a></li>
                            <li><a class="dropdown-item" href="javascript:void(0)">Electronic</a></li>
                            <li><a class="dropdown-item" href="goods-of-all-kinds.php">Goods Of
                                    All Kinds</a></li>
                        </ul>
                    </div>
                    <!-- Category end -->
                </div>
                <div class="col-md-10 col-sm-8 rightBx">
                    <div class="navBtnRow">
                        <a class="navbar-brand showXs" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="index.php">Home</a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="about-us.php">About Us</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Career</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Press</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Classifieds Magazine</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Mobile apps</a></li>
                            <li class="nav-item"><a class="nav-link" href="contact-us.php">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!--************ navbar part end here ************-->