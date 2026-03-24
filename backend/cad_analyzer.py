import random
from typing import Dict, Any, List

class CADAnalyzer:
    """Mock CAD analyzer - no AI/LLM integration for data security"""
    
    @staticmethod
    def analyze_file(file_name: str, file_size: int) -> Dict[str, Any]:
        """
        Mock analysis of CAD file
        Returns pricing, lead time, and DFM insights based on file characteristics
        """
        
        # Mock complexity based on file size
        complexity = "simple" if file_size < 500000 else "moderate" if file_size < 2000000 else "complex"
        
        # Mock pricing calculation
        base_price = 150 if complexity == "simple" else 350 if complexity == "moderate" else 650
        price_variance = random.uniform(0.85, 1.15)
        estimated_price = round(base_price * price_variance, 2)
        
        # Mock lead time
        lead_times = {
            "simple": (3, 5),
            "moderate": (5, 8),
            "complex": (10, 15)
        }
        lead_time_range = lead_times[complexity]
        estimated_lead_time = random.randint(*lead_time_range)
        
        # Mock DFM insights
        dfm_insights = [
            "Part geometry suitable for CNC machining",
            f"Estimated complexity: {complexity.capitalize()}",
            "Consider adding draft angles for better machinability",
            "Wall thickness appears adequate for structural integrity"
        ]
        
        if complexity == "complex":
            dfm_insights.append("Complex features detected - recommend review for cost optimization")
            dfm_insights.append("Consider splitting into sub-assemblies for easier manufacturing")
        
        # Mock material recommendations
        materials = ["Aluminum 6061", "Stainless Steel 304", "ABS Plastic", "Nylon 6/6"]
        recommended_material = random.choice(materials)
        
        # Mock process recommendations
        processes = ["CNC Milling", "CNC Turning", "3D Printing (SLA)", "Sheet Metal Fabrication"]
        recommended_process = random.choice(processes)
        
        return {
            "part_name": file_name,
            "complexity": complexity,
            "estimated_price": estimated_price,
            "price_range": {
                "min": round(estimated_price * 0.85, 2),
                "max": round(estimated_price * 1.15, 2)
            },
            "lead_time_days": estimated_lead_time,
            "lead_time_range": {
                "min": lead_time_range[0],
                "max": lead_time_range[1]
            },
            "recommended_material": recommended_material,
            "recommended_process": recommended_process,
            "dfm_insights": dfm_insights,
            "manufacturability_score": random.randint(75, 95),
            "warnings": [] if complexity != "complex" else ["Review recommended for cost optimization"]
        }
    
    @staticmethod
    def batch_analyze(files: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Analyze multiple CAD files and provide batch pricing
        """
        results = []
        total_price = 0
        max_lead_time = 0
        
        for file_info in files:
            analysis = CADAnalyzer.analyze_file(
                file_info["file_name"],
                file_info["file_size"]
            )
            results.append(analysis)
            total_price += analysis["estimated_price"]
            max_lead_time = max(max_lead_time, analysis["lead_time_days"])
        
        # Bulk discount
        if len(files) > 5:
            discount = 0.10
            total_price = total_price * (1 - discount)
        elif len(files) > 10:
            discount = 0.15
            total_price = total_price * (1 - discount)
        
        return {
            "parts": results,
            "total_price": round(total_price, 2),
            "estimated_lead_time": max_lead_time,
            "part_count": len(files),
            "batch_discount_applied": len(files) > 5
        }
