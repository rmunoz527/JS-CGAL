/**
 * Created by rmunoz on 10/8/2014.
 */
function ConvexHull()
{
    var points = [];
    var hullPoints = [];
    // Stores upper hull points to be joined with lower to complete convexhull
    var hullUpper = [];

    this.AddPoints = function(p_points){points = p_points;}

    // Created using Monotone chain algorithm which splits the hull into upper and lower halves and computes each
    // individually. The results are then merged as lower + upper.
    this.CreateHull = function()
    {
        points.sort(CompareX);
        var lower = [];
        for (var i = 0; i < points.length; i++) {
            while (lower.length >= 2 && ccw(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
                lower.pop();
            }
            lower.push(points[i]);
        }

        var upper = [];
        for (var i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 && ccw(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }

        upper.pop();
        lower.pop();
        return lower.concat(upper);

    }

    // Three points are a counter-clockwise turn if ccw > 0, clockwise if ccw < 0, and collinear if ccw = 0 because ccw is a
    // determinant that gives twice the signed area of the triangle formed by p1,p2, and p3.
    function ccw(p1,p2,p3)
    {
        var result = (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x);
        return result;
    }

    function CompareX(a,b)
    {
        if(a.x < b.x)
            return -1;
        else if(a.x > b.x)
            return 1;
        else
            return 0;
    }

    function CompareY(a,b)
    {
        if(a.y < b.y)
            return -1;
        else if(a.y > b.y)
            return 1;
        else
            return 0;
    }

    function SortX()
    {
        this.points.sort(CompareX);
    }

    function SortY()
    {
        this.points.sort(CompareY);
    }






}